import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
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
  public photo: File;
  public preview: string;

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
    picture: new FormControl('')
  };

  constructor(
    private userService: UserService,
    private router:Router,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer
    ) {}

  ngOnInit(): void {
    this.initFormParent();
    this.getRoles();
  }

  getRoles () {
    this.userService.getRoles().subscribe(
      (res) => {
        this.roles = res;
        console.log(this.dataUser);
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

  async createUser () {
    if (this.photo)
      await this.uploadPhotoProfile(this.formCreatePerson.value);

    const value: CreateUser = this.formCreatePerson.value;

    this.userService.createUser(value).subscribe(
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

  uploadPhotoProfile = (user: CreateUser) => new Promise((resolve, reject) => {
    const formPhoto = new FormData();
    formPhoto.append('file', this.photo, `${user.nit}.png`)
    this.userService.uploadPhotoUser(formPhoto).subscribe(
      (res) => {
        this.formCreatePerson.setValue({
          ...this.formCreatePerson.value,
          picture: res.route
        });
        // console.log(res.route);
        resolve(res)
      },
      (error) => {
        reject(error)
      }
    );
  })

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
      bornDate: this.dataUser.bornDate.split('T')[0],
      picture: this.dataUser.picture
    });
  };

  async updateUser() {
    if (this.photo)
      await this.uploadPhotoProfile(this.formCreatePerson.value);

    const value: CreateUser = this.formCreatePerson.value;

    this.userService.editUser(this.dataUser.id, value).subscribe(
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

  handleGetPhoto(event: any) {
    const image = event.target.files[0]
    this.photo = image;
    this.extraerImagen64(image).then((res: any) => {
      this.preview = res.base;
    }).catch(error => {
      console.log(error);
    })
  }

  extraerImagen64 = async ($event: any) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      return new Promise((resolve, reject) => {
        reader.onload = () => {
          resolve({
            base: reader.result
          });
        };
        reader.onerror = error => {
          resolve({
            base: null
          });
        };
      });
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  onSubmit(event: Event): void {
    this.pushSubmit = true;
    event.preventDefault();
    if (this.formCreatePerson.valid) {
      if (this.dataUser) {
        this.updateUser();
      } else {
        this.createUser();
      }
    }
  }

}
