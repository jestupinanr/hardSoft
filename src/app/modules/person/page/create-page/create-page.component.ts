import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateUser, Rol } from '@core/models/user/User.model';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  public formCreatePerson: FormGroup = new FormGroup({});
  public pushSubmit: boolean = false;
  public roles: Rol[] = []

  constructor(
    private userService: UserService,
    private router:Router,
    private toastr: ToastrService,
    ) {
    this.initFormParent();

  }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles () {
    this.userService.getRoles().subscribe(
      (res) => {
        this.roles = res;
      },
      (error) => {
        error.error.message.map((msg:string) =>
          this.toastr.error(msg)
        )
      }
    );
  }

  createUser (user: CreateUser) {
    this.userService.createUser(user).subscribe(
      (res) => {
        this.toastr.success('Usario correctamente creado');
        this.router.navigate(['/person/detail', res.id]);
      },
      (error) => {
        error.error.message.map((msg:string) =>
          this.toastr.error(msg)
        )
      }
    );
  }

  initFormParent(): void {
    this.formCreatePerson = new FormGroup({
      nit: new FormControl('', [Validators.required, Validators.minLength(5)]),
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(7)]),
      role: new FormControl('', [Validators.required]),
      phone1: new FormControl('', [Validators.required, Validators.minLength(8)]),
      address: new FormControl('', [Validators.required, Validators.minLength(6)]),
      bornDate: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(event: Event): void {
    this.pushSubmit = true;
    if (this.formCreatePerson.valid) {
      event.preventDefault();
      const value: CreateUser = this.formCreatePerson.value;
      this.createUser(value);
    }
  }

}
