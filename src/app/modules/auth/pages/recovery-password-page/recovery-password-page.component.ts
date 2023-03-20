import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recovery-password-page',
  templateUrl: './recovery-password-page.component.html',
  styleUrls: ['./recovery-password-page.component.scss']
})
export class RecoveryPasswordPageComponent implements OnInit {

  public formLogin: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) {
    this.initFormParent();

  }

  ngOnInit(): void {
  }

  initFormParent(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

}
