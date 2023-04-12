import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SearchUser, User } from '@core/models/user/User.model';
import { PopupEditPersonComponent } from '@shared/components/popups/popup-edit-user/popup-edit-user.component';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'search-page-user',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent {

  @Input () value: boolean;
  public users: SearchUser[] = [];
  @Output() idUser = new EventEmitter<User>();
  popupResourceRef: MatDialogRef<PopupEditPersonComponent>;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router:Router,
    private dialogRef: MatDialog,
  ) {
    this.getAllUsers()
  }

  getAllUsers () {
    this.userService.getAllUsers().subscribe(
      (res) => {
        this.organiceElements(res);
      },
      (error) => {
        error.error.message.map((msg:string) =>
          this.toastr.error(msg)
        )
      }
    );
  };

  organiceElements (res: User[]) {
    this.users = [];
    const initial: string[] = res.map((objet) => objet.name.charAt(0).toUpperCase());

    const filtered: Record<string, SearchUser> = {};

    for (let i = 0; i < initial.length; i++) {
      const letra = initial[i];
      if (!(letra in filtered)) {
        filtered[letra] = { letter: letra, user: [] };
      }
      filtered[letra].user.push(res[i]);
    }

    const claves = Object.keys(filtered).sort();

    for (const order of claves) {
      this.users.push(filtered[order])
    }
  };

  openModalEditPerson (item: User) {
    this.popupResourceRef = this.dialogRef.open(PopupEditPersonComponent, {
      data: { person: item },
      minWidth: '90vw',
      maxWidth: '90vw',
      minHeight: '90vh',
      maxHeight: '90vh'
    });

    this.popupResourceRef.afterClosed()
    .subscribe((user : User | undefined ) => {
      if (user)
        this.users.map(item => {
          const index = item.user.findIndex(item => item?.id === user.id);
          if (index !== -1)
            item.user[index] = {
                ...user
              }
        });
      })
  };

  hanldeRedirect = (user: User) => {
    if (this.value) {
      this.idUser.emit(user);
    } else {
      this.router.navigate(['/person/detail' , user.id])
    }
  };

  editPerson (item: User) {
    this.openModalEditPerson(item)
  }

  getDataSearch (e: any) {
    this.userService.getUsersQueries(e.target.value).subscribe(
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

  clearSearch () {
    console.log('entre');

    this.userService.getUsersQueries('').subscribe(
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
