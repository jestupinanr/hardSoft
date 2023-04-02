import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { PopupComponent } from './components/popups/popup-search-user/popup.component';
import { PersonModule } from '@modules/person/person.module';
import { PopupSearchResourceComponent } from './components/popups/popup-search-resource/popup-search-resource.component';
import { ResourceModule } from '@modules/resource/resource.module';
import { AssignmentModule } from '@modules/assignment/assignment.module';
import { PopupSearchAssigmentComponent } from './components/popups/popup-search-assigment/popup.component';
import { PopupEditHardwareComponent } from './components/popups/popup-edit-hardware/popup-edit-hardware.component';
import { PopupEditSoftwareComponent } from './components/popups/popup-edit-software/popup-edit-software.component';
import { PopupEditPersonComponent } from './components/popups/popup-edit-user/popup-edit-user.component';
import { PopupEditIncidentComponent } from './components/popups/popup-edit-incident/popup-edit-incident.component';
import { IncidentModule } from '@modules/incidents/incident.module';
import { PopupEditAssigmentComponent } from './components/popups/popup-edit-assigment/popup-edit-assigment.component';

@NgModule({
  declarations: [
    SideBarComponent,
    HeaderComponent,
    PopupComponent,
    PopupSearchResourceComponent,
    PopupSearchAssigmentComponent,
    PopupEditHardwareComponent,
    PopupEditSoftwareComponent,
    PopupEditPersonComponent,
    PopupEditIncidentComponent,
    PopupEditAssigmentComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PersonModule,
    AssignmentModule,
    ResourceModule,
    IncidentModule,
    AssignmentModule
  ],
  exports:[
    SideBarComponent,
    HeaderComponent,
  ]
})
export class SharedModule { }
