import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  public formRegister: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) {
    this.initFormParent();

  }

  ngOnInit(): void {
  }

  initFormParent(): void {
    this.formRegister = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, Validators.minLength(5)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      role: new FormControl('', [Validators.required])
    });
  }

}
