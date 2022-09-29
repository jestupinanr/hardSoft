import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePageComponent } from './pages/hardware/create-page/create-page.component';
import { CreatePageComponent as CreatePageComponentSF } from './pages/software/create-page/create-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';

const routes: Routes = [
  {
    path: 'create/hardware',
    component: CreatePageComponent,
  },
  {
    path: 'create/software',
    component: CreatePageComponentSF,
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
    redirectTo: "/resource"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourceRoutingModule { }
