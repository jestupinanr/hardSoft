import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateHardware, StatusResource } from '@core/models/resource/Resource.model';
import { ToastrService } from 'ngx-toastr';
import { ResourceService } from 'src/app/services/resource.service';

@Component({
  selector: 'app-create-hardware',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  public formCreateHardware: FormGroup = new FormGroup({});
  public pushSubmit: boolean = false;
  public status: StatusResource[] = []

  constructor(
    private resourceService: ResourceService,
    private toastr: ToastrService,
    private router:Router
    ) {
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
        error.error.message.map((msg:string) =>
          this.toastr.error(msg)
        )
      }
    );
  }

  createHardware(hardware: CreateHardware): void {
    this.resourceService.createHardware(hardware).subscribe(
      (res) => {
        this.toastr.success('Hardware correctamente creado');
        this.router.navigate(['/resource/detail', res.id]);
      },
      (error) => {
        error.error.message.map((msg:string) =>
          this.toastr.error(msg)
        )
      }
    );
  }


  initFormParent(): void {
    this.formCreateHardware = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      status: new FormControl('', [Validators.required]),
      brand: new FormControl('', [Validators.required, Validators.minLength(2)]),
      model: new FormControl('', [Validators.required, Validators.minLength(2)]),
      type: new FormControl('', [Validators.required, Validators.minLength(2)]),
      observations: new FormControl('', [Validators.required, Validators.minLength(2)]),
      acquisitionDate: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(event: Event): void {
    this.pushSubmit = true;
    if (this.formCreateHardware.valid) {
      event.preventDefault();
      const value: CreateHardware = this.formCreateHardware.value;
      this.createHardware(value);
    }
  }

}
