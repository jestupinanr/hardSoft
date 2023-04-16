import { AfterContentInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Assigment, createrAssigment } from '@core/models/assigment/Assigments.model';
import { Resources } from '@core/models/resource/Resource.model';
import { User } from '@core/models/user/User.model';
import { PopupSearchResourceComponent } from '@shared/components/popups/popup-search-resource/popup-search-resource.component';
import { PopupComponent } from '@shared/components/popups/popup-search-user/popup.component';
import { ToastrService } from 'ngx-toastr';
import { AssigmentService } from 'src/app/services/assigment.service';

@Component({
  selector: 'app-create-assigment',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit, AfterContentInit {

  public formCreateAssigment: FormGroup = new FormGroup({});
  popupDialogRef: MatDialogRef<PopupComponent>;
  popupResourceRef: MatDialogRef<PopupSearchResourceComponent>;
  user: User;
  resource: Resources;
  public pushSubmit: boolean = false;
  @Input()
  public dataAssigment: Assigment
  @Output() assigmentReturn = new EventEmitter<Assigment>();
  public formGroupinitial = {
    user: new FormControl('', [Validators.required]),
    resource: new FormControl('', [Validators.required]),
    description:  new FormControl('', [Validators.required, Validators.minLength(5)]),
    returnDate: new FormControl('',[])
  }

  constructor(
    private dialogRef: MatDialog,
    private assigmentService: AssigmentService,
    private toastr: ToastrService,
    private router:Router,
  ) {
  }

  ngOnInit(): void {
    this.initFormParent();
  }

  ngAfterContentInit(): void {
    if (this.dataAssigment)
      this.initFormEdit();
  }

  createAssigment (createAssigment: createrAssigment) {
    this.assigmentService.createAssigment(createAssigment).subscribe(
      (res) => {
        this.toastr.success('Asignación correctamente creada');
        this.router.navigate(['/assignment/detail', res.id]);
      },
      (error) => {
        error.error.message.map((msg:string) =>
          this.toastr.error(msg)
        )
      }
    );
  };

  updateAssigment(assigmentForm: createrAssigment) {
    this.assigmentService.editAssigment(this.dataAssigment.id, assigmentForm).subscribe(
      (res) => {
        this.toastr.success('Asignación editada correctamente');
        this.assigmentReturn.emit(res);
      },
      (error) => {
        error.error.message.map((msg:string) =>
          this.toastr.error(msg)
        )
      }
    );
  }

  openModalUser () {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '90vw';
    dialogConfig.maxWidth = '90vw';

    dialogConfig.maxHeight = '50vw';
    dialogConfig.minHeight = '50vw';

    this.popupDialogRef = this.dialogRef.open(PopupComponent, {
      ...dialogConfig,
    })

    this.popupDialogRef.afterClosed()
    .subscribe(user => {
      this.user = user;
      this.formCreateAssigment.setValue({
        ...this.formCreateAssigment.value,
        user: user.id
      })
    })
  };

  openModalResource () {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '90vw';
    dialogConfig.maxWidth = '90vw';

    dialogConfig.maxHeight = '50vw';
    dialogConfig.minHeight = '50vw';

    this.popupResourceRef = this.dialogRef.open(PopupSearchResourceComponent, {
      ...dialogConfig,
    })

    this.popupResourceRef.afterClosed()
    .subscribe(resource => {
      this.resource = resource;
      this.formCreateAssigment.setValue({
        ...this.formCreateAssigment.value,
        resource: resource.id
      })
    })
  };

  initFormParent(): void {
    this.formCreateAssigment = new FormGroup(this.formGroupinitial);
  }

  initFormEdit(): void {
    this.user = this.dataAssigment.user;
    this.resource = this.dataAssigment.resource;
    this.formCreateAssigment.setValue({
      ...this.formCreateAssigment.value,
      user: this.dataAssigment.user.id,
      resource: this.dataAssigment.resource.id,
      description: this.dataAssigment.description,
      returnDate: this.dataAssigment.returnDate
    });
  };

  onSubmit(event: Event): void {
    this.pushSubmit = true;
    event.preventDefault();
    if (this.formCreateAssigment.valid) {
      const value: createrAssigment = this.formCreateAssigment.value;
      if (this.dataAssigment)
        this.updateAssigment(value);
      else
        this.createAssigment(value);
    }
  }

}
