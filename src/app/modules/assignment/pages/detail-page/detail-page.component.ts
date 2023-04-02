import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Assigment } from '@core/models/assigment/Assigments.model';
import { PopupEditAssigmentComponent } from '@shared/components/popups/popup-edit-assigment/popup-edit-assigment.component';
import { ToastrService } from 'ngx-toastr';
import { AssigmentService } from 'src/app/services/assigment.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {

  public assigment: Assigment;
   popupResourceRef: MatDialogRef<PopupEditAssigmentComponent>;
  constructor(
     private dialogRef: MatDialog,
    private route:ActivatedRoute,
    private toastr: ToastrService,
    private assigmentService: AssigmentService,
  ) { }


  ngOnInit(): void {
    this.getDataAssigment(this.route.snapshot.paramMap.get('id'))
  }

  getDataAssigment (id: string | null) {
    if (id === null) {
      this.toastr.error('Falta el id del recurso');
    } else {
      this.assigmentService.getOneAssigmentById(id).subscribe(
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
  };

  openModalEditAssigment() {
    this.popupResourceRef = this.dialogRef.open(PopupEditAssigmentComponent, {
      data: { assigment: this.assigment },
      minWidth: '90vw',
      maxWidth: '90vw',
      minHeight: '90vh',
      maxHeight: '90vh'
    });

    this.popupResourceRef.afterClosed()
    .subscribe((assigment : Assigment | undefined ) => {
      if (assigment)
        this.assigment = assigment;
      })
  };

  editAssigment () {
    this.openModalEditAssigment();
  }

}
