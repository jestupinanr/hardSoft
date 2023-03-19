import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Resources } from '@core/models/resource/Resource.model';
import { ToastrService } from 'ngx-toastr';
import { ResourceService } from 'src/app/services/resource.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {

  public resource: Resources;

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
    }
  }

}
