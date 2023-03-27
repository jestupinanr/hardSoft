import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Assigment } from '@core/models/assigment/Assigments.model';
import { Resources } from '@core/models/resource/Resource.model';
import { PopupEditHardwareComponent } from '@shared/components/popup-edit-hardware/popup-edit-hardware.component';
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

  constructor(
    private dialogRef: MatDialog,
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

  openModalResourceHardware () {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '90vw';
    dialogConfig.maxWidth = '90vw';

    dialogConfig.maxHeight = '50vw';
    dialogConfig.minHeight = '50vw';

    this.popupResourceRef = this.dialogRef.open(PopupEditHardwareComponent, {
      data: {
        hardware: this.resource.hardware,
      },
      ...dialogConfig,
    })

    this.popupResourceRef.afterClosed()
    .subscribe(resource => {
      console.log(resource);
    })
  };

  editResource() {
   if (this.resource.hardware)
    this.openModalResourceHardware()
  }

}
