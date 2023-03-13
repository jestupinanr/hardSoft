import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StatusResource } from '@core/models/resource/Resource.model';
import { ResourceService } from 'src/app/services/resource.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  public formCreateHardware: FormGroup = new FormGroup({});
  public pushSubmit: boolean = false;
  public status: StatusResource[] = []

  constructor(private resourceService: ResourceService) {
    this.initFormParent();

  }

  ngOnInit(): void {
    this.getStatus()
  }

  getStatus(): void {
    this.resourceService.getStatus().subscribe(
      (res) => {
        this.status = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }


  initFormParent(): void {
    this.formCreateHardware = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      hardwareStatus: new FormControl('', [Validators.required, Validators.minLength(5)]),
      brand: new FormControl('', [Validators.required, Validators.minLength(5)]),
      model: new FormControl('', [Validators.required, Validators.minLength(5)]),
      mac: new FormControl('', [Validators.required, Validators.minLength(5)]),
      type: new FormControl('', [Validators.required, Validators.minLength(5)]),
      observations: new FormControl('', [Validators.required, Validators.minLength(5)]),
      creationDate: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });

    this.formCreateHardware.valueChanges.subscribe(value => {
      console.log(value);
    })
  }

  onSubmit(event: Event): void {
    this.pushSubmit = true;
    if (this.formCreateHardware.valid) {
      event.preventDefault();
      const value = this.formCreateHardware.value;
      // this.service.login(value).subscribe(
        // (res) => {

        // }, (error) => {

        // }
      // )
    }
  }

}
