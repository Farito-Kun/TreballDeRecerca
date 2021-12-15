import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddFormComponent } from './add-form/add-form.component';
import { RouterModule, Routes } from '@angular/router';
import { GraphicsComponent } from './graphics/graphics.component'; 
import { LogsComponent } from './logs/logs.component';
import { PerfilComponent } from './perfil/perfil.component';


//Graphic lib
import { NgxChartsModule } from '@swimlane/ngx-charts';



/****Angular material ****** ****** ****** */
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { MatListModule } from '@angular/material/list'; 
import { MatCardModule } from '@angular/material/card'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import {MatTableModule} from '@angular/material/table'; 
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/****** ****** ****** ****** ****** ****** */

//Auth Guard
import { AuthGuard } from '../public/guards/auth.guard';
import { FooterComponent } from './footer/footer.component';
import { EmailComponent } from './email/email.component';
import { AddEmailComponent } from './add-email/add-email.component';
import {MatExpansionModule} from '@angular/material/expansion';
const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    canActivate: [AuthGuard],

    children: [
      {
        path:"addData",
        component: AddFormComponent,
        canActivate: [AuthGuard]
      },
      {
        path:"graficas",
        component: GraphicsComponent,
        canActivate: [AuthGuard]
      },
      {
        path:"logs",
        component: LogsComponent,
        canActivate: [AuthGuard]
      },
      {
        path:"perfil",
        component: PerfilComponent,
        canActivate: [AuthGuard]
      }
      ,{
        path:"emails",
        component: EmailComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
]

@NgModule({
  declarations: [
    DashboardComponent,
    AddFormComponent,
    GraphicsComponent,
    LogsComponent,
    PerfilComponent,
    FooterComponent,
    EmailComponent,
    AddEmailComponent
  ],
  imports: [
    NgxChartsModule,
    CommonModule,
    RouterModule.forChild(routes),

    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
