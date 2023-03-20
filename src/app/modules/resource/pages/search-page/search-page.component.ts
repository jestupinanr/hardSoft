import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Resources, searchResource } from '@core/models/resource/Resource.model';
import { ToastrService } from 'ngx-toastr';
import { ResourceService } from 'src/app/services/resource.service';

@Component({
  selector: 'search-page-resource',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  @Input () value: boolean;
  public resources: searchResource[] = [];
  @Output() idResource = new EventEmitter<string>();

  constructor(
    private resourceService: ResourceService,
    private toastr: ToastrService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getResources();
  }

  getResources = () => {
    this.resourceService.getAllResources().subscribe(
      (res) => {
        this.organiceElements(res)
      },
      (error) => {
        error.error.message.map((msg:string) =>
          this.toastr.error(msg)
        )
      }
    );
  }

  organiceElements (res: Resources[]) {
    const initial: string[] = res.map((objet) => {
      if (objet.hardware)
        return objet.hardware.name.charAt(0).toUpperCase()
      if (objet.software)
        return objet.software.name.charAt(0).toUpperCase()

      return 'none'
    });

    const filtered: Record<string, searchResource> = {};

    for (let i = 0; i < initial.length; i++) {
      const letra = initial[i];
      if (!(letra in filtered)) {
        filtered[letra] = { letter: letra, resources: [] };
      }
      filtered[letra].resources.push(res[i]);
    }

    const claves = Object.keys(filtered).sort();

    for (const order of claves) {
      this.resources.push(filtered[order])
    }
  };

  hanldeRedirect = (resource: Resources) => {
    if (this.value) {
      this.idResource.emit(resource.id);
    } else {
      this.router.navigate(['/resource/detail' , resource.id])
    }
  };
}
