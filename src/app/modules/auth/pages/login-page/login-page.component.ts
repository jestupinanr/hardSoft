import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public formLogin: FormGroup = new FormGroup({});
  public pushSubmit: boolean = false;

  constructor(
    private service: AuthService,
    private router:Router,
    private toastr: ToastrService,
    private cookieService: CookieService
    ) {
    this.initFormParent();

  }

  ngOnInit(): void {
  }

  initFormParent(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    });

    this.formLogin.valueChanges.subscribe(value => {
    })
  }

  onSubmit(event: Event): void {
    this.pushSubmit = true;
    if (this.formLogin.valid) {
      event.preventDefault();
      const value = this.formLogin.value;
      this.service.login(value).subscribe(
        (res) => {
          this.cookieService.set('token', res.token, 1, '/')
          this.cookieService.set('userName', res.user.name, 1, '/')
          this.cookieService.set('roleName', res.user.role.name, 1, '/')
          this.router.navigate(['/']);
        }, (error) => {
          this.toastr.error('Email o contraseña incorrecta');
        }
      )
    }
  }


}
