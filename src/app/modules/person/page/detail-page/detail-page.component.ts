import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Assigment } from '@core/models/assigment/Assigments.model';
import { User } from '@core/models/user/User.model';
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

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private toastr: ToastrService,
    private userService: UserService,
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

  routerToResource (assigment: Assigment) {
    this.router.navigate(['/resource/detail', assigment.resource.id])
  }

}
