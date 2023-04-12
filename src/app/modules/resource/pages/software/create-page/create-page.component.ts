import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BrandsResource, CreateHardware, CreateSoftware, Software, StatusResource, TypesResource } from '@core/models/resource/Resource.model';
import { ToastrService } from 'ngx-toastr';
import { ResourceService } from 'src/app/services/resource.service';

@Component({
  selector: 'app-create-software',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  public formCreateSoftware: FormGroup = new FormGroup({});
  public pushSubmit: boolean = false;
  public status: StatusResource[] = [];
  public brands: BrandsResource[] = [];
  public types: TypesResource[] = [];
  public showNewBrand: boolean = false;
  public showNewType: boolean = false;
  public formNewBrand: FormGroup = new FormGroup({});
  public formNewType: FormGroup = new FormGroup({});
  @Input()
  public dataSoftware: Software;
  @Output() softwareReturn = new EventEmitter<Software>();

  public formGroupInitial = {
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    status: new FormControl('', [Validators.required]),
    brand: new FormControl('', [Validators.required, Validators.minLength(2)]),
    licenseNumber: new FormControl('', [Validators.required, Validators.minLength(2)]),
    type: new FormControl('', [Validators.required, Validators.minLength(2)]),
    observations: new FormControl('', [Validators.required, Validators.minLength(2)]),
    acquisitionDate: new FormControl('', [Validators.required]),
    renovationDate: new FormControl('', [Validators.required]),
  }

  constructor(
    private resourceService: ResourceService,
    private toastr: ToastrService,
    private router:Router
    ) {}

  ngOnInit(): void {
    this.initFormParent();
    this.getStatus();
  }

  getStatus(): void {
    this.resourceService.getStatus().subscribe(
      (res) => {
        this.status = res;
        this.getBrands();
      },
      (error) => {
        error.error.message.map((msg:string) =>
          this.toastr.error(msg)
        )
      }
    );
  }

  getBrands(): void {
    this.resourceService.getBrandsSoftware().subscribe(
      (res) => {
        this.brands = res;
        this.showNewBrand = false;
        this.getTypes();
      },
      (error) => {
        error.error.message.map((msg:string) =>
          this.toastr.error(msg)
        )
      }
    );
  }

  getTypes(): void {
    this.resourceService.getTypesSoftware().subscribe(
      (res) => {
        this.types = res;
        this.showNewType = false;
        if (this.dataSoftware) {
          this.initFormEdit();
        }
      },
      (error) => {
        error.error.message.map((msg:string) =>
          this.toastr.error(msg)
        )
      }
    );
  }

  createSoftware(software: CreateSoftware): void {
    this.resourceService.createSoftware(software).subscribe(
      (res) => {
        this.toastr.success('Software correctamente creado');
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
    this.formCreateSoftware = new FormGroup(this.formGroupInitial);
    this.eventListenerNewBrand();
    this.eventListenerNewType();
  }

  initFormEdit(): void {
    this.formCreateSoftware.setValue({
      ...this.formCreateSoftware.value,
      name: this.dataSoftware.name,
      status: this.dataSoftware.status.id,
      brand: this.dataSoftware.brand.id,
      licenseNumber: this.dataSoftware.licenseNumber,
      type: this.dataSoftware.type.id,
      observations: this.dataSoftware.observations,
      acquisitionDate: this.dataSoftware.acquisitionDate.split('T')[0],
      renovationDate: this.dataSoftware.renovationDate.split('T')[0],
    });
  }

  eventListenerNewBrand() {
    this.formCreateSoftware.get("brand")?.valueChanges.subscribe(x => {
      if (x === 'other') {
       this.formCreateSoftware = new FormGroup({
         ...this.formGroupInitial,
         newBrand: new FormControl('', []),
       });
       this.showNewBrand = true;
      }
     else{
       this.showNewBrand = false,
       this.formCreateSoftware = new FormGroup(this.formGroupInitial);
     }
    })
  }

  eventListenerNewType() {
    this.formCreateSoftware.get("type")?.valueChanges.subscribe(x => {
      if (x === 'other') {
       this.formCreateSoftware = new FormGroup({
         ...this.formGroupInitial,
         newType: new FormControl('', []),
       });
       this.showNewType = true;
      }
     else{
       this.showNewType = false,
       this.formCreateSoftware = new FormGroup(this.formGroupInitial);
     }
    })
  }

  createNewBrand(name: string) {
    this.resourceService.createbrandSoftware(name).subscribe(
      (res) => {
        this.toastr.success('Marca correctamente creada');
        this.getBrands();
        this.formCreateSoftware.setValue({
          ...this.formCreateSoftware.value,
          brand: res.id
        });
        this.formCreateSoftware = new FormGroup(this.formGroupInitial);
      },
      (error) => {
        error.error.message.map((msg:string) =>
          this.toastr.error(msg)
        )
      }
    );
  }

  createNewType(name: string) {
    this.resourceService.createTypeSoftware(name).subscribe(
      (res) => {
        this.toastr.success('Tipo correctamente creado');
        this.getTypes();
        this.formCreateSoftware.setValue({
          ...this.formCreateSoftware.value,
          type: res.id
        });
        this.formCreateSoftware = new FormGroup(this.formGroupInitial);
      },
      (error) => {
        error.error.message.map((msg:string) =>
          this.toastr.error(msg)
        )
      }
    );
  };


  updateSoftware(softwareForm: CreateSoftware) {
    this.resourceService.editSoftware(this.dataSoftware.id, softwareForm).subscribe(
      (res) => {
        this.toastr.success('Software editado creado');
        this.softwareReturn.emit(res);
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
    if (this.formCreateSoftware.get("newBrand")) {
      this.createNewBrand(this.formCreateSoftware.get("newBrand")?.value);
    } else if (this.formCreateSoftware.get("newType")) {
      this.createNewType(this.formCreateSoftware.get("newType")?.value);
    } else {
      this.pushSubmit = true;
      if (this.formCreateSoftware.valid) {
        const value: CreateSoftware = this.formCreateSoftware.value;
        if (this.dataSoftware)
        this.updateSoftware(value);
        else
          this.createSoftware(value);
      }
    }
  }

}
