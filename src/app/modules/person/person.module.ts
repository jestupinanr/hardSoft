import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonRoutingModule } from './person-routing.module';
import { SearchPageComponent } from './page/search-page/search-page.component';
import { CreatePageComponent } from './page/create-page/create-page.component';
import { DetailPageComponent } from './page/detail-page/detail-page.component';


@NgModule({
  declarations: [
    SearchPageComponent,
    CreatePageComponent,
    DetailPageComponent
  ],
  imports: [
    CommonModule,
    PersonRoutingModule
  ]
})
export class PersonModule { }
