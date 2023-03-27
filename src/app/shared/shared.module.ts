import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { PopupComponent } from './components/popup-search-user/popup.component';
import { PersonModule } from '@modules/person/person.module';
import { PopupSearchResourceComponent } from './components/popup-search-resource/popup-search-resource.component';
import { ResourceModule } from '@modules/resource/resource.module';
import { AssignmentModule } from '@modules/assignment/assignment.module';
import { PopupSearchAssigmentComponent } from './components/popup-search-assigment/popup.component';
import { PopupEditHardwareComponent } from './components/popup-edit-hardware/popup-edit-hardware.component';

@NgModule({
  declarations: [
    SideBarComponent,
    HeaderComponent,
    PopupComponent,
    PopupSearchResourceComponent,
    PopupSearchAssigmentComponent,
    PopupEditHardwareComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PersonModule,
    AssignmentModule,
    ResourceModule,
  ],
  exports:[
    SideBarComponent,
    HeaderComponent,
  ]
})
export class SharedModule { }
