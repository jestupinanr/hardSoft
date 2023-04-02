import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignmentRoutingModule } from './assignment-routing.module';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SearchPageComponent,
    CreatePageComponent,
    DetailPageComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AssignmentRoutingModule
  ],
  exports: [
    SearchPageComponent,
    CreatePageComponent
  ]
})
export class AssignmentModule { }
