import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Assigment } from '@core/models/assigment/Assigments.model';
import { CreateIncident, incident, statusIncident } from '@core/models/incident/Incident.model';
import { PopupSearchAssigmentComponent } from '@shared/components/popups/popup-search-assigment/popup.component';
import { ToastrService } from 'ngx-toastr';
import { IncidentService } from 'src/app/services/incident.service';

@Component({
  selector: 'app-create-incident',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  public formCreateIncident: FormGroup = new FormGroup({});
  popupAssigmentref: MatDialogRef<PopupSearchAssigmentComponent>;
  assigment: Assigment;
  status: statusIncident[];
  public pushSubmit: boolean = false;
  @Input()
  public dataIncident: incident
  @Output() incidentReturn = new EventEmitter<incident>();
  public formGroupinitial = {
    title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    assigment: new FormControl('', [Validators.required]),
    incidentStatus: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.minLength(5)]),
    solution: new FormControl('', []),
  }

  constructor(
    private dialogRef: MatDialog,
    private incidentService: IncidentService,
    private toastr: ToastrService,
    private router:Router,
  ) {}

  ngOnInit(): void {
    this.initFormParent();
    this.getStatus();
  }

  getStatus() {
    this.incidentService.getStatus().subscribe(
      (res) => {
        this.status = res;
        if (this.dataIncident)
          this.initFormEdit();
      },
      (error) => {
        error.error.message.map((msg:string) =>
          this.toastr.error(msg)
        )
      }
    )
  }

  initFormParent(): void {
    this.formCreateIncident = new FormGroup(this.formGroupinitial);
  }

  initFormEdit(): void {
    this.assigment = this.dataIncident.assigment;
    this.formCreateIncident.setValue({
      ...this.formCreateIncident.value,
      title: this.dataIncident.title,
      assigment: this.dataIncident.assigment.id,
      incidentStatus: this.dataIncident.incidentStatus.id,
      description: this.dataIncident.description,
      solution: this.dataIncident.solution
    });
  }

  openModalAssigment () {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '90vw';
    dialogConfig.maxWidth = '90vw';

    dialogConfig.maxHeight = '50vw';
    dialogConfig.minHeight = '50vw';

    this.popupAssigmentref = this.dialogRef.open(PopupSearchAssigmentComponent, {
      ...dialogConfig,
    })

    this.popupAssigmentref.afterClosed()
    .subscribe(assigment => {
      this.assigment = assigment;
      this.formCreateIncident.setValue({
        ...this.formCreateIncident.value,
        assigment: assigment.id
      })
    })
  };

  createIncident (user: CreateIncident) {
    this.incidentService.createIncident(user).subscribe(
      (res) => {
        this.toastr.success('Incidente correctamente creado');
        this.router.navigate(['/incident/detail', res.id]);
      },
      (error) => {
        error.error.message.map((msg:string) =>
          this.toastr.error(msg)
        )
      }
    );
  };

  updateIncident(incidentForm: CreateIncident) {
    this.incidentService.editIncident(this.dataIncident.id, incidentForm).subscribe(
      (res) => {
        this.toastr.success('Incidendia editada creado');
        this.incidentReturn.emit(res);
      },
      (error) => {
        error.error.message.map((msg:string) =>
          this.toastr.error(msg)
        )
      }
    );
  }

  onSubmit(event: Event): void {
    this.pushSubmit = true;
    event.preventDefault();
    if (this.formCreateIncident.valid) {
      const value: CreateIncident = this.formCreateIncident.value;
      if (this.dataIncident)
        this.updateIncident(value);
      else
        this.createIncident(value);
    }
  }
}
