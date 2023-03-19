import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Resources } from '@core/models/resource/Resource.model';
import { ToastrService } from 'ngx-toastr';
import { ResourceService } from 'src/app/services/resource.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  public resources: Resources[] = [];

  constructor(
    private resourceService: ResourceService,
    private toastr: ToastrService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getResources()
  }

  getResources = () => {
    this.resourceService.getAllResources().subscribe(
      (res) => {
        this.resources = res;
      },
      (error) => {
        error.error.message.map((msg:string) =>
          this.toastr.error(msg)
        )
      }
    );
  }

  hanldeRedirect = (resource: Resources) => {
    this.router.navigate(['/resource/detail' , resource.id])
  };

}
