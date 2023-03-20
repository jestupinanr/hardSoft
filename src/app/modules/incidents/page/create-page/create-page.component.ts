import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateIncident, statusIncident } from '@core/models/incident/Incident.model';
import { PopupSearchAssigmentComponent } from '@shared/components/popup-search-assigment/popup.component';
import { ToastrService } from 'ngx-toastr';
import { IncidentService } from 'src/app/services/incident.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  public formCreateIncident: FormGroup = new FormGroup({});
  popupAssigmentref: MatDialogRef<PopupSearchAssigmentComponent>;
  idAssigment: string;
  status: statusIncident[];
  public pushSubmit: boolean = false;

  constructor(
    private dialogRef: MatDialog,
    private incidentService: IncidentService,
    private toastr: ToastrService,
    private router:Router,

  ) {
    this.initFormParent();
    this.getStatus();
  }

  ngOnInit(): void {
  }

  getStatus() {
    this.incidentService.getStatus().subscribe(
      (res) => {
        this.status = res;
      },
      (error) => {
        error.error.message.map((msg:string) =>
          this.toastr.error(msg)
        )
      }
    )
  }

  initFormParent(): void {
    this.formCreateIncident = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(2)]),
      assigment: new FormControl('', [Validators.required]),
      incidentStatus: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.minLength(5)]),
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
    .subscribe(idAssigment => {
      this.idAssigment = idAssigment;
      this.formCreateIncident.setValue({
        ...this.formCreateIncident.value,
        assigment: idAssigment
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
  }

  onSubmit(event: Event): void {
    this.pushSubmit = true;
    if (this.formCreateIncident.valid) {
      event.preventDefault();
      const value: CreateIncident = this.formCreateIncident.value;
      this.createIncident(value);
    }
  }
}
