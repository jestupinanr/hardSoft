import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  public formCreatePerson: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder
    ) { 
    this.initFormParent();
    
  }

  ngOnInit(): void {
  }

  initFormParent(): void {
    this.formCreatePerson = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, Validators.minLength(5)]),
      nit: new FormControl('', [Validators.required, Validators.minLength(5)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(5)]),
      rol: new FormControl('', [Validators.required, Validators.minLength(5)]),
      address: new FormControl('', [Validators.required, Validators.minLength(5)]),
      bornDate: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });

    this.formCreatePerson.valueChanges.subscribe(value => {
      console.log(value);
    })
  }

}
