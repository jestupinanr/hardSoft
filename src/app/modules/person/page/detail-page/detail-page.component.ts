import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Assigment } from '@core/models/assigment/Assigments.model';
import { User } from '@core/models/user/User.model';
import { PopupEditPersonComponent } from '@shared/components/popups/popup-edit-user/popup-edit-user.component';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {

  public user: User;
  public assigments: Assigment[] = [];
  popupResourceRef: MatDialogRef<PopupEditPersonComponent>;
  public agePerson: number;
  public urlProfile: string;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private toastr: ToastrService,
    private userService: UserService,
    private dialogRef: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getDataUser(this.route.snapshot.paramMap.get('id'))
  }

  getDataUser (id: string | null) {
    if (id === null) {
      this.toastr.error('Falta el id del recurso');
    } else {
      // Get Data User
      this.userService.getOneUserById(id).subscribe(
        (res) => {
          this.user = res;
          if (res.picture)
            this.urlProfile = `http://localhost:3000${res.picture}`;
          this.calculateAgePerson(res);
        },
        (error) => {
          error.error.message.map((msg:string) =>
            this.toastr.error(msg)
          )
        }
      );

      // Get data assigments

      this.userService.getAssigmentByUser(id).subscribe(
        (res) => {
          this.assigments = res;
        },
        (error) => {
          error.error.message.map((msg:string) =>
            this.toastr.error(msg)
          )
        }
      );
    }
  };

  calculateAgePerson(user: User) {
    const hoy = new Date();
    const fechaNac = new Date(user.bornDate);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }
    this.agePerson = edad;
  }

  openModalEditPerson () {
    this.popupResourceRef = this.dialogRef.open(PopupEditPersonComponent, {
      data: { person: this.user },
      minWidth: '90vw',
      maxWidth: '90vw',
      minHeight: '90vh',
      maxHeight: '90vh'
    });

    this.popupResourceRef.afterClosed()
    .subscribe((user : User | undefined ) => {
      if (user)
        this.user = user;
      })
  };

  routerToResource (assigment: Assigment) {
    this.router.navigate(['/resource/detail', assigment.resource.id])
  }

  editPerson () {
    this.openModalEditPerson()
  }

  routerToAssigment (idAssigment: string) {
    this.router.navigate(['/assignment/detail/', idAssigment])
  }

}
