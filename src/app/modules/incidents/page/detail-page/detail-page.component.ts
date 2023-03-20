import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { incident } from '@core/models/incident/Incident.model';
import { ToastrService } from 'ngx-toastr';
import { IncidentService } from 'src/app/services/incident.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {

  public incident: incident;

  constructor(
    private route:ActivatedRoute,
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
  }
}
