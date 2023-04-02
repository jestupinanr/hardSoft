import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateUser, Rol, User } from '@core/models/user/User.model';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  public formCreatePerson: FormGroup = new FormGroup({});
  public pushSubmit: boolean = false;
  public roles: Rol[] = [];
  @Input()
  public dataUser: User;
  @Output() userReturn = new EventEmitter<User>();

  public formGroupinitial = {
    nit: new FormControl('', [Validators.required, Validators.minLength(5)]),
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(7)]),
    role: new FormControl('', [Validators.required]),
    phone1: new FormControl('', [Validators.required, Validators.minLength(8)]),
    address: new FormControl('', [Validators.required, Validators.minLength(6)]),
    bornDate: new FormControl('', [Validators.required]),
  };

  constructor(
    private userService: UserService,
    private router:Router,
    private toastr: ToastrService,
    ) {}

  ngOnInit(): void {
    this.initFormParent();
    this.getRoles();
  }

  getRoles () {
    this.userService.getRoles().subscribe(
      (res) => {
        this.roles = res;
         if (this.dataUser) {
          this.initFormEdit();
        }
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
    this.formCreatePerson = new FormGroup(this.formGroupinitial);
  };

  initFormEdit(): void {

    this.formCreatePerson = new FormGroup({
      ...this.formGroupinitial,
      password: new FormControl('', []),
    });

    this.formCreatePerson.setValue({
      nit: this.dataUser.nit,
      name: this.dataUser.name,
      lastName: this.dataUser.lastName,
      email: this.dataUser.email,
      password: '',
      role: this.dataUser.role.id,
      phone1: this.dataUser.phone1,
      address: this.dataUser.address,
      bornDate: this.dataUser.bornDate.split('T')[0]
    });
  };

  updateUser(userForm: CreateUser) {
    this.userService.editUser(this.dataUser.id, userForm).subscribe(
      (res) => {
        this.toastr.success('Usuario editado correctamente');
        this.userReturn.emit(res);
      },
      (error) => {
        error.error.message.map((msg:string) =>
          this.toastr.error(msg)
        )
      }
    );
  }

  onSubmit(event: Event): void {
    this.pushSubmit = true;
    event.preventDefault();
    const value: CreateUser = this.formCreatePerson.value;
    if (this.formCreatePerson.valid) {
      if (this.dataUser) {
        this.updateUser(value);
      } else {
        this.createUser(value);
      }
    }
  }

}
