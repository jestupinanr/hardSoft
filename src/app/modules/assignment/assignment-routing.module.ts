import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreatePageComponent,
  },
  {
    path: 'search',
    component: SearchPageComponent,
  },
  {
    path: 'detail/:id',
    component: DetailPageComponent,
  },
  {
    path: "**",
    redirectTo: "/assignment"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AssignmentRoutingModule { }
