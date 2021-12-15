import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';




import { RouterModule, Routes } from '@angular/router';
/*const routes: Routes = [
  { path: '', component: AppComponent,  pathMatch: 'full'},
  { path: 'login', component: LoginComponent,  pathMatch: 'full'},
];*/


const routes: Routes = [
  {
    path: "",
    loadChildren:() => import("./modules/public/public.module").then(m=>m.PublicModule)
  },
  {
    path: "dashboard",
    loadChildren:() => import("./modules/dashboard/dashboard.module").then(m=>m.DashboardModule)
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
