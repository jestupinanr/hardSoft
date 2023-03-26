import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { createrAssigment } from '@core/models/assigment/Assigments.model';
import { Resources } from '@core/models/resource/Resource.model';
import { User } from '@core/models/user/User.model';
import { PopupSearchResourceComponent } from '@shared/components/popup-search-resource/popup-search-resource.component';
import { PopupComponent } from '@shared/components/popup-search-user/popup.component';
import { ToastrService } from 'ngx-toastr';
import { AssigmentService } from 'src/app/services/assigment.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  public formCreateAssigment: FormGroup = new FormGroup({});
  popupDialogRef: MatDialogRef<PopupComponent>;
  popupResourceRef: MatDialogRef<PopupSearchResourceComponent>;
  user: User;
  resource: Resources;
  public pushSubmit: boolean = false;

  constructor(
    private dialogRef: MatDialog,
    private assigmentService: AssigmentService,
    private toastr: ToastrService,
    private router:Router,
  ) {
    this.initFormParent();
  }

  ngOnInit(): void {
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
    this.formCreateAssigment = new FormGroup({
      user: new FormControl('', [Validators.required]),
      resource: new FormControl('', [Validators.required]),
      description:  new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
  }

  onSubmit(event: Event): void {
    this.pushSubmit = true;
    if (this.formCreateAssigment.valid) {
      event.preventDefault();
      const value: createrAssigment = this.formCreateAssigment.value;
      this.createAssigment(value);
    }
  }

}
