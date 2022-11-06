import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public formLogin: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private service: AuthService) { 
    this.initFormParent();
    
  }

  ngOnInit(): void {
  }

  initFormParent(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(5)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    });

    this.formLogin.valueChanges.subscribe(value => {
      console.log(value);
    })
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    const value = this.formLogin.value;
    this.service.getUserLogin(value)
  }


}
