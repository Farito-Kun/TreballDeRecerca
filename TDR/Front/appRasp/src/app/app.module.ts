import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

/**
 * Environment variables
 */
import { environment } from 'src/environments/environment.prod';

//Protocolo http
import { HttpClientModule } from '@angular/common/http';
 
/**
 * Firebase
 */
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



 
//Cargar js file
import { CargarJsService } from'./services/cargar-js.service'



//Form validation
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';

//Toast alert
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    
  ],
  providers: [CargarJsService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
