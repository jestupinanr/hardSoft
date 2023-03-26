import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SearchUser, User } from '@core/models/user/User.model';
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

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router:Router
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

  hanldeRedirect = (user: User) => {
    if (this.value) {
      this.idUser.emit(user);
    } else {
      this.router.navigate(['/person/detail' , user.id])
    }
  };

}
