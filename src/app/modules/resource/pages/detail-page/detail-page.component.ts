import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Assigment } from '@core/models/assigment/Assigments.model';
import { Resources } from '@core/models/resource/Resource.model';
import { User } from '@core/models/user/User.model';
import { ToastrService } from 'ngx-toastr';
import { ResourceService } from 'src/app/services/resource.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {

  public resource: Resources;
  public assigment: Assigment;

  constructor(
    private route:ActivatedRoute,
    private toastr: ToastrService,
    private resourceService: ResourceService
  ) {}

  ngOnInit(): void {
    this.getDataResource(this.route.snapshot.paramMap.get('id'))
  }

  getDataResource (id: string | null) {
    if (id === null) {
      this.toastr.error('Falta el id del recurso');
    } else {
      // Get data resource
      this.resourceService.getOneResourceById(id).subscribe(
        (res) => {
          this.resource = res;
        },
        (error) => {
          error.error.message.map((msg:string) =>
            this.toastr.error(msg)
          )
        }
      );

       // Get data user assigned
       this.resourceService.getAssigmentByIdResource(id).subscribe(
        (res) => {
          this.assigment = res;
        },
        (error) => {
          error.error.message.map((msg:string) =>
            this.toastr.error(msg)
          )
        }
      );
    }
  }

}
