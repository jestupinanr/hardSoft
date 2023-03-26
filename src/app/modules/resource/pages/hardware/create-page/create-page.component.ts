import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BrandsResource, CreateHardware, StatusResource, TypesResource } from '@core/models/resource/Resource.model';
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
  public status: StatusResource[] = [];
  public brands: BrandsResource[] = [];
  public types: TypesResource[] = [];
  public showNewBrand: boolean = false;
  public showNewType: boolean = false;
  public formNewBrand: FormGroup = new FormGroup({});
  public formNewType: FormGroup = new FormGroup({});

  public formGroupinitial = {
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    status: new FormControl('', [Validators.required]),
    brand: new FormControl('', [Validators.required,]),
    model: new FormControl('', [Validators.required, Validators.minLength(2)]),
    type: new FormControl('', [Validators.required]),
    observations: new FormControl('', [Validators.required, Validators.minLength(2)]),
    acquisitionDate: new FormControl('', [Validators.required]),
  }

  constructor(
    private resourceService: ResourceService,
    private toastr: ToastrService,
    private router:Router
    ) {
    this.initFormParent();
  }

  ngOnInit(): void {
    this.getStatus();
    this.getBrands();
    this.getTypes();
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
  getBrands(): void {
    this.resourceService.getBrandsHardware().subscribe(
      (res) => {
        this.brands = res;
        this.showNewBrand = false;
      },
      (error) => {
        error.error.message.map((msg:string) =>
          this.toastr.error(msg)
        )
      }
    );
  }

  getTypes(): void {
    this.resourceService.getTypesHardware().subscribe(
      (res) => {
        this.types = res;
        this.showNewType = false;
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
    this.formCreateHardware = new FormGroup(this.formGroupinitial);
    this.eventListenerNewBrand();
    this.eventListenerNewType();
  }

  eventListenerNewBrand() {
    this.formCreateHardware.get("brand")?.valueChanges.subscribe(x => {
      if (x === 'other') {
       this.formCreateHardware = new FormGroup({
         ...this.formGroupinitial,
         newBrand: new FormControl('', []),
       });
       this.showNewBrand = true;
      }
     else{
       this.showNewBrand = false,
       this.formCreateHardware = new FormGroup(this.formGroupinitial);
     }
    })
  }

  eventListenerNewType() {
    this.formCreateHardware.get("type")?.valueChanges.subscribe(x => {
      if (x === 'other') {
       this.formCreateHardware = new FormGroup({
         ...this.formGroupinitial,
         newType: new FormControl('', []),
       });
       this.showNewType = true;
      }
     else{
       this.showNewType = false,
       this.formCreateHardware = new FormGroup(this.formGroupinitial);
     }
    })
  }

  createNewBrand(name: string) {
    this.resourceService.createbrandHardware(name).subscribe(
      (res) => {
        this.toastr.success('Marca correctamente creada');
        this.getBrands();
        this.formCreateHardware.setValue({
          ...this.formCreateHardware.value,
          brand: res.id
        });
        this.formCreateHardware = new FormGroup(this.formGroupinitial);
      },
      (error) => {
        error.error.message.map((msg:string) =>
          this.toastr.error(msg)
        )
      }
    );
  }

  createNewType(name: string) {
    this.resourceService.createTypeHardware(name).subscribe(
      (res) => {
        this.toastr.success('Tipo correctamente creado');
        this.getTypes();
        this.formCreateHardware.setValue({
          ...this.formCreateHardware.value,
          type: res.id
        });
        this.formCreateHardware = new FormGroup(this.formGroupinitial);
      },
      (error) => {
        error.error.message.map((msg:string) =>
          this.toastr.error(msg)
        )
      }
    );
  }


  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.formCreateHardware.get("newBrand")) {
      this.createNewBrand(this.formCreateHardware.get("newBrand")?.value);
    } else if (this.formCreateHardware.get("newType")) {
      this.createNewType(this.formCreateHardware.get("newType")?.value);
    } else {
      this.pushSubmit = true;
      if (this.formCreateHardware.valid) {
        const value: CreateHardware = this.formCreateHardware.value;
        this.createHardware(value);
      }
    }
  }

}
