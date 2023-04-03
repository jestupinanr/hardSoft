import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { incident, SearchIncident } from '@core/models/incident/Incident.model';
import { PopupEditIncidentComponent } from '@shared/components/popups/popup-edit-incident/popup-edit-incident.component';
import { ToastrService } from 'ngx-toastr';
import { IncidentService } from 'src/app/services/incident.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  public incidents: SearchIncident[] = [];
  popupResourceRef: MatDialogRef<PopupEditIncidentComponent>;
  constructor(
    private incidentService: IncidentService,
    private toastr: ToastrService,
    private router:Router,
    private dialogRef: MatDialog,
  ) {
    this.getAllIncidents()
  }

  ngOnInit(): void {
  }

  getAllIncidents () {
    this.incidentService.getAllIncidents().subscribe(
      (res) => {
        this.organiceElements(res);
      },
      (error) => {
        error.error.message.map((msg:string) =>
          this.toastr.error(msg)
        )
      }
    );
  }

  organiceElements (res: incident[]) {
    const initial: string[] = res.map((objet) => objet.assigment.user.name.charAt(0).toUpperCase());

    const filtered: Record<string, SearchIncident> = {};

    for (let i = 0; i < initial.length; i++) {
      const letra = initial[i];
      if (!(letra in filtered)) {
        filtered[letra] = { letter: letra, incident: [] };
      }
      filtered[letra].incident.push(res[i]);
    }

    const claves = Object.keys(filtered).sort();

    for (const order of claves) {
      this.incidents.push(filtered[order])
    }
  };


  hanldeRedirect = (incident: incident) => {
    this.router.navigate(['/incident/detail' , incident.id])
  };

  openModaEditIncident (item: incident) {
    this.popupResourceRef = this.dialogRef.open(PopupEditIncidentComponent, {
      data: { incident: item },
      minWidth: '90vw',
      maxWidth: '90vw',
      minHeight: '90vh',
      maxHeight: '90vh'
    });

    this.popupResourceRef.afterClosed()
    .subscribe((incident : incident | undefined ) => {
      if (incident)
        this.incidents.map(item => {
          const index = item.incident.findIndex(item => item?.id === incident.id);
          if (index !== -1)
            item.incident[index] = {
                ...incident
              }
        });
      })
  };

  editIncidents (item: incident) {
    this.openModaEditIncident(item);
  }

}
