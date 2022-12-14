import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  {
    path: 'assignment',
    loadChildren: () => import('@modules/assignment/assignment.module').then(m => m.AssignmentModule)
  },
  {
    path: 'person',
    loadChildren: () => import('@modules/person/person.module').then(m => m.PersonModule)
  },
  {
    path: 'report',
    loadChildren: () => import('@modules/report/report.module').then(m => m.ReportModule)
  },
  {
    path: 'resource',
    loadChildren: () => import('@modules/resource/resource.module').then(m => m.ResourceModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
