import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Expense } from './components/employee/expense/expense';
import { Dashboard } from './components/employee/dashboard/dashboard';
import { Emptrack } from './components/employee/emptrack/emptrack';
import { Empbooking } from './components/employee/empbooking/empbooking';
import { Login } from './components/login/login';
import { Navbar } from './components/employee/navbar/navbar';

const routes: Routes = [
   { path: '', component:Login},
  {path:"employee",component:Navbar,children:[
  { path: '', component:Dashboard},
  { path: 'expense', component:Expense},
  

  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
