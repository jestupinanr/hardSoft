import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Hardware, Resources, searchResource, Software } from '@core/models/resource/Resource.model';
import { PopupEditHardwareComponent } from '@shared/components/popups/popup-edit-hardware/popup-edit-hardware.component';
import { PopupEditSoftwareComponent } from '@shared/components/popups/popup-edit-software/popup-edit-software.component';
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
  @Output() resource = new EventEmitter<Resources>();
  popupResourceRef: MatDialogRef<PopupEditHardwareComponent>;
  popupResourceSofRef: MatDialogRef<PopupEditSoftwareComponent>;

  constructor(
    private resourceService: ResourceService,
    private toastr: ToastrService,
    private router:Router,
    private dialogRef: MatDialog,
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
    this.resources = [];
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
      this.resource.emit(resource);
    } else {
      this.router.navigate(['/resource/detail' , resource.id])
    }
  };

  openModalResourceHardware (resource: Resources) {
    this.popupResourceRef = this.dialogRef.open(PopupEditHardwareComponent, {
      data: { hardware: resource.hardware },
      minWidth: '90vw',
      minHeight: '90vh'
    });

    this.popupResourceRef.afterClosed()
    .subscribe((hardware : Hardware | undefined ) => {
      if (hardware) {
        this.resources.map(item => {
          const index = item.resources.findIndex(item => item.hardware?.id === hardware.id);
          if (index !== -1)
            item.resources[index].hardware = {
              ...hardware
            }
        });
      }
      })
  };

  openModalResourceSoftware (resource: Resources) {
    this.popupResourceSofRef = this.dialogRef.open(PopupEditSoftwareComponent, {
      data: { software: resource.software },
      minWidth: '90vw',
      minHeight: '90vh'
    });

    this.popupResourceSofRef.afterClosed()
    .subscribe((software : Software | undefined ) => {
      if (software)
        this.resources.map(item => {
          const index = item.resources.findIndex(item => item.software?.id === software.id);
          if (index !== -1)
            item.resources[index].software = {
              ...software
            }
        });
      })
  };

  editResource(item: Resources) {
    if (item.hardware)
     this.openModalResourceHardware(item)
     else
       this.openModalResourceSoftware(item)
  }

  getDataSearch (e: any) {
    this.resourceService.getResourcesSearch(e.target.value).subscribe(
      (res) => {
        this.organiceElements(res)
      },
      (error) => {
        error.error.message.map((msg:string) =>
          this.toastr.error(msg)
        )
      }
    )
  }

}
