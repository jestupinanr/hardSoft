import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResourceRoutingModule } from './resource-routing.module';
import { CreatePageComponent } from './pages/hardware/create-page/create-page.component';
import { CreatePageComponent as  CreatePageComponentSf } from './pages/software/create-page/create-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreatePageComponent,
    SearchPageComponent,
    DetailPageComponent,
    CreatePageComponentSf
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ResourceRoutingModule,
  ],
  exports: [
    SearchPageComponent
  ],
})
export class ResourceModule { }
