import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-generate-page',
  templateUrl: './generate-page.component.html',
  styleUrls: ['./generate-page.component.scss']
})
export class GeneratePageComponent implements OnInit {

  public formCreateGenerate: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder
    ) {
    this.initFormParent();

  }

  ngOnInit(): void {
  }

  initFormParent(): void {
    this.formCreateGenerate = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, Validators.minLength(5)]),
      cedula: new FormControl('', [Validators.required, Validators.minLength(5)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(5)]),
      rol: new FormControl('', [Validators.required, Validators.minLength(5)]),
      address: new FormControl('', [Validators.required, Validators.minLength(5)]),
      bornDate: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
  }
}



