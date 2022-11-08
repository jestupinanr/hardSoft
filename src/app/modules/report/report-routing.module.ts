import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneratePageComponent} from './generate-page/generate-page.component';
const routes: Routes = [
  {
    path: 'create/report',
    component: GeneratePageComponent,
  },
  {
    path: "**",
    redirectTo: "/report"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
