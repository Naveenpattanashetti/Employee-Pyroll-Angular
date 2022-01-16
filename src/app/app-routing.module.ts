import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddEmployeeComponent} from './add-employee/add-employee.component';
import {DashboardComponent} from './dashboard/dashboard.component';
const routes: Routes = [
 
  {path: '', component: DashboardComponent},
  {path: 'addemployee', component: AddEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
