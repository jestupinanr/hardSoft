import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@core/models/user/User.model';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  public users: User[] = [];

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers () {
    this.userService.getAllUsers().subscribe(
      (res) => {
        this.users = res;
      },
      (error) => {
        error.error.message.map((msg:string) =>
          this.toastr.error(msg)
        )
      }
    );
  }

  hanldeRedirect = (user: User) => {
    this.router.navigate(['/person/detail' , user.id])
  };

}
