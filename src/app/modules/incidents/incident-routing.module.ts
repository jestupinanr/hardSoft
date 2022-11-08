import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchPageComponent } from './page/search-page/search-page.component';
import { CreatePageComponent } from './page//create-page/create-page.component';
import { DetailPageComponent } from './page/detail-page/detail-page.component';

const routes: Routes = [
  {
    path: 'create/incident',
    component: CreatePageComponent,
  },
  {
    path: 'search',
    component: SearchPageComponent,
  },
  {
    path: 'detail',
    component: DetailPageComponent,
  },
  {
    path: "**",
    redirectTo: "/incident"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncidentRoutingModule { }
