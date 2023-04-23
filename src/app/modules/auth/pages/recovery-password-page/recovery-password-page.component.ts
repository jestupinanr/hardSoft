import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recovery-password-page',
  templateUrl: './recovery-password-page.component.html',
  styleUrls: ['./recovery-password-page.component.scss']
})
export class RecoveryPasswordPageComponent implements OnInit {

  public formRecovery: FormGroup = new FormGroup({});
  public pushSubmit: boolean = false;
  public token: string | null;

  constructor(private formBuilder: FormBuilder,
  private route:ActivatedRoute,
  private authService: AuthService,
  private toastr: ToastrService,
  private router:Router,
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('id')
    this.initFormParent();
  }


  initFormParent(): void {
    if (this.route.snapshot.paramMap.get('id'))
      this.formRecovery = new FormGroup({
        password: new FormControl('', [Validators.required, Validators.minLength(5)]),
        passwordRepeat: new FormControl('', [Validators.required, Validators.minLength(5)]),
      });
    else
      this.formRecovery = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
      });
  }

  getToken (value: { email: string }) {
    this.authService.getTokenRecoveryPassword(value.email).subscribe(
      () => {
        this.toastr.success('Revisa tu correo electronico para continuar');
      },
      () => {
        this.toastr.success('El usuario no existe');
      }
    );
  }

  savePassword (password: string) {
    this.authService.savePassword(password, this.token ? this.token : '').subscribe(
      () => {
        this.toastr.success('Contraseña actualizada correctamente');
        this.router.navigate(['/'])
      },
      () => {
        this.toastr.error('El usuario no existe');
      }
    );
  }

  onSubmit(event: Event): void {
    event.preventDefault();
      this.pushSubmit = true;
      if (this.token !== null) {
        if (this.formRecovery.valid) {
          const value = this.formRecovery.value;
          if (value.password !== value.passwordRepeat)
            this.toastr.error('Las contraseñas no coinciden');
          else {
            console.log(value);
            this.savePassword(value.password);
          }
        }
      } else {
        const value: { email: string } = this.formRecovery.value;
        this.getToken(value);
      }
    }

}
