import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})

export class CreatePageComponent implements OnInit {

  public formCreateHardware: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) { 
    this.initFormParent();
    
  }

  ngOnInit(): void {
  }

  initFormParent(): void {
    this.formCreateHardware = new FormGroup({
      nameHardware: new FormControl('', [Validators.required, Validators.minLength(5)]),
      hardwareStatus: new FormControl('', [Validators.required, Validators.minLength(5)]),
      brand: new FormControl('', [Validators.required, Validators.minLength(5)]),
      model: new FormControl('', [Validators.required, Validators.minLength(5)]),
      mac: new FormControl('', [Validators.required, Validators.minLength(5)]),
      type: new FormControl('', [Validators.required, Validators.minLength(5)]),
      observations: new FormControl('', [Validators.required, Validators.minLength(5)]),
      creationDate: new FormControl('', [Validators.required, Validators.minLength(5)]),
      assignmentStatus: new FormControl('', [Validators.required]),
    });

    this.formCreateHardware.valueChanges.subscribe(value => {
      console.log(value);
    })
  }

}
// export class CreatePageComponent implements OnInit {

//   public formCreateSoftware: FormGroup = new FormGroup({});

//   constructor(private formBuilder: FormBuilder) { 
//     this.initFormParent();
    
//   }

//   ngOnInit(): void {
//   }

//   initFormParent(): void {
//     this.formCreateSoftware = new FormGroup({
//       nameSoftware: new FormControl('', [Validators.required, Validators.minLength(5)]),
//       softwareStatus: new FormControl('', [Validators.required, Validators.minLength(5)]),
//       type: new FormControl('', [Validators.required, Validators.minLength(5)]),
//       brand: new FormControl('', [Validators.required, Validators.minLength(5)]),
//       licenseNumber: new FormControl('', [Validators.required, Validators.minLength(5)]),
//       observations: new FormControl('', [Validators.required, Validators.minLength(5)]),
//       creationDate: new FormControl('', [Validators.required, Validators.minLength(5)]),
//       assignmentStatus: new FormControl('', [Validators.required]),
//     });

//     this.formCreateSoftware.valueChanges.subscribe(value => {
//       console.log(value);
//     })
//   }

// }
