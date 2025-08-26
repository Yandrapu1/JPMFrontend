import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Dashboard } from './components/employee/dashboard/dashboard';
import {Expense} from "./components/employee/expense/expense"
import { Empbooking } from './components/employee/empbooking/empbooking';
import { Emptrack } from './components/employee/emptrack/emptrack';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Navbar } from './components/employee/navbar/navbar';
import { Login } from './components/login/login';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    App,
    Dashboard,
    Expense,
    Empbooking,
    Emptrack,
    Navbar,
    Login
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
