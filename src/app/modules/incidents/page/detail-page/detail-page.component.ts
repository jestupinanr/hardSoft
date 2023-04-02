import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { incident } from '@core/models/incident/Incident.model';
import { PopupEditIncidentComponent } from '@shared/components/popups/popup-edit-incident/popup-edit-incident.component';
import { ToastrService } from 'ngx-toastr';
import { IncidentService } from 'src/app/services/incident.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {

  public incident: incident;
  popupResourceRef: MatDialogRef<PopupEditIncidentComponent>;
  constructor(
    private route:ActivatedRoute,
    private dialogRef: MatDialog,
    private router:Router,
    private toastr: ToastrService,
    private incidentService: IncidentService,
  ) { }

  ngOnInit(): void {
    this.getDataIncident(this.route.snapshot.paramMap.get('id'))
  }

  getDataIncident (id: string | null) {
    if (id === null) {
      this.toastr.error('Falta el id del recurso');
    } else {
      this.incidentService.getOneIncidentById(id).subscribe(
        (res) => {
          this.incident = res;
        },
        (error) => {
          error.error.message.map((msg:string) =>
            this.toastr.error(msg)
          )
        }
      );
    }
  };

  redirectToUser(incident: incident) {
    this.router.navigate(['/person/detail', incident.assigment.user.id])
  }

  redirectToResource(incident: incident) {
    this.router.navigate(['/resource/detail', incident.assigment.resource.id])
  };

  openModaEditIncident () {
    this.popupResourceRef = this.dialogRef.open(PopupEditIncidentComponent, {
      data: { incident: this.incident },
      minWidth: '90vw',
      maxWidth: '90vw',
      minHeight: '90vh',
      maxHeight: '90vh'
    });

    this.popupResourceRef.afterClosed()
    .subscribe((incident : incident | undefined ) => {
      if (incident)
        this.incident = incident;
      })
  };

  editIncidents () {
    this.openModaEditIncident();
  }
}
