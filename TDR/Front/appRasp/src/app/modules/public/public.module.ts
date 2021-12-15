import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './components/homepage/homepage.component';


import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';

const routes: Routes = [
  {
    path: "",
    component: HomepageComponent
  },
  {
    path: "login",
    component: LoginComponent
  }
]

@NgModule({
  declarations: [
    HomepageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PublicModule { }
