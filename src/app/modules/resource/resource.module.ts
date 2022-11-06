import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResourceRoutingModule } from './resource-routing.module';
import { CreatePageComponent } from './pages/hardware/create-page/create-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreatePageComponent,
    SearchPageComponent,
    DetailPageComponent
  ],
  imports: [
    CommonModule,
    ResourceRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ResourceModule { }
