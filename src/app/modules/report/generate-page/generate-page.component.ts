import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { reportForm } from '@core/models/report';
import { AssigmentService } from 'src/app/services/assigment.service';
import { IncidentService } from 'src/app/services/incident.service';
import { ResourceService } from 'src/app/services/resource.service';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-generate-page',
  templateUrl: './generate-page.component.html',
  styleUrls: ['./generate-page.component.scss']
})
export class GeneratePageComponent implements OnInit {

  public formCreateGenerate: FormGroup = new FormGroup({});
  public pushSubmit: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private incidentService: IncidentService,
    private assigmentService: AssigmentService,
    private resourceService: ResourceService
    ) {
    this.initFormParent();

  }

  ngOnInit(): void {
  }

  initFormParent(): void {
    this.formCreateGenerate = new FormGroup({
      dateStart: new FormControl('', [Validators.required]),
      dateEnd: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
    });
  };

  getDataExcel (value: reportForm ) {
    switch (value.type) {
      case 'user':
        this.userService.getReportExcel(value);
        break;
      case 'incident':
        this.incidentService.getReportExcel(value);
        break;
      case 'assigment':
        this.assigmentService.getReportExcel(value);
        break;
      case 'hardware':
        this.resourceService.getReportExcelHardware(value)
        break;
      case 'software':
        this.resourceService.getReportExcelSoftware(value);
        break;
      default:
        break;
    }
  }

  onSubmit(event: Event) {
    this.pushSubmit = true;
    event.preventDefault();
    if (this.formCreateGenerate.valid) {
      const value: reportForm = this.formCreateGenerate.value;
      this.getDataExcel(value);
    }
  }
}



