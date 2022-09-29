import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { GeneratePageComponent } from './generate-page/generate-page.component';


@NgModule({
  declarations: [
    GeneratePageComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule
  ]
})
export class ReportModule { }
