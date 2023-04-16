import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Assigment } from '@core/models/assigment/Assigments.model';
import { Hardware, Resources, Software } from '@core/models/resource/Resource.model';
import { PopupEditHardwareComponent } from '@shared/components/popups/popup-edit-hardware/popup-edit-hardware.component';
import { PopupEditSoftwareComponent } from '@shared/components/popups/popup-edit-software/popup-edit-software.component';
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
  popupResourceRef: MatDialogRef<PopupEditHardwareComponent>;
  popupResourceSofRef: MatDialogRef<PopupEditSoftwareComponent>;

  constructor(
    private dialogRef: MatDialog,
    private route:ActivatedRoute,
    private toastr: ToastrService,
    private resourceService: ResourceService,
    private router:Router,
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

  openModalResourceHardware () {
    this.popupResourceRef = this.dialogRef.open(PopupEditHardwareComponent, {
      data: { hardware: this.resource.hardware },
      minWidth: '90vw',
      minHeight: '90vh'
    });

    this.popupResourceRef.afterClosed()
    .subscribe((hardware : Hardware | undefined ) => {
      if (hardware)
        this.resource = {
          ...this.resource,
          hardware
        };
      })
  };

  openModalResourceSoftware () {
    this.popupResourceSofRef = this.dialogRef.open(PopupEditSoftwareComponent, {
      data: { software: this.resource.software },
      minWidth: '90vw',
      minHeight: '90vh'
    });

    this.popupResourceSofRef.afterClosed()
    .subscribe((software : Software | undefined ) => {
      if (software)
        this.resource = {
          ...this.resource,
          software
        };
      })
  };

  editResource() {
   if (this.resource.hardware)
    this.openModalResourceHardware()
    else
      this.openModalResourceSoftware()
    }

    handleGoToAssigment(assigment: Assigment) {
      this.router.navigate(['/assignment/detail/' , assigment.id])
    }

    handleGoToPerson(idUser: string) {
      this.router.navigate(['/person/detail//' , idUser])
    }


}
