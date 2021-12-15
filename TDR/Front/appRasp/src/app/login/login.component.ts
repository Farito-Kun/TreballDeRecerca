import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

//Cargar js file
import { CargarJsService } from '../services/cargar-js.service';

import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";

//Toaster alert
import { ToastrService } from 'ngx-toastr';

//Router
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm !: FormGroup;
  registerForm !: FormGroup;

  constructor(
    private route:Router,
    private auth: LoginService,
    private cargarJS: CargarJsService,
    private toastr: ToastrService,
  ) {
    cargarJS.cargarScript(["login"]);
   }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      user: new FormControl('younes@gmail.com', [Validators.required, Validators.email]),
      pass: new FormControl('123456',[Validators.required, Validators.minLength(6)])
    })

    this.registerForm = new FormGroup({
      user_reg: new FormControl('', [Validators.required, Validators.email]),
      pass_reg: new FormControl('',[Validators.required, Validators.minLength(6)])
    })
  }

  async login(){

    if(this.loginForm.invalid){
      this.loginForm.errors
      this.toastr.error('Datos incorrectos: Contraseña: mínimo 6 caracteres', 'Error', {
        timeOut: 3000,
      });
    }else{
      try {
        const signinData = this.loginForm.value
        await this.auth.loginMethod(signinData.user,signinData.pass)
        this.toastr.success('¡Bienvenido de nuevo!', 'Login', {
          timeOut: 3000,
        });

        this.auth.autentificado
        this.route.navigate(['/dashboard/graficas']);
      }catch (e: any){
        this.toastr.error('Error a la hora de iniciar sesión', 'Login', {
          timeOut: 3000,
        });
      }
    }
  }

  async registrarse(){

    if(this.registerForm.invalid){
      this.toastr.error('Datos incorrectos: Email y Contraseña: mínimo 6 caracteres', 'Error', {
        timeOut: 3000,
      });
    }else{
      const signinData = this.registerForm.value
      try {
        await this.auth.registrar(signinData.user_reg,signinData.pass_reg)
        this.toastr.success('Usuario creado correctamente. Hemos enviado un correo de verificación a su cuenta.', 'Registrarse', {
          timeOut: 3000,
        });
        
        //Verificar cuenta.
        this.auth.verificarCorreo()

      }catch (e: any){
        this.toastr.error('Error a la hora de registrarse.', 'Registrarse', {
          timeOut: 3000,
        });
      }
    }
  }

  async login_facebook(){
    try {
      await this.auth.facebookAuth()
    }catch (e: any){
      alert(e.message)
    }
  }

  async login_gmail(){
    try {
      await this.auth.googleAuth()
    }catch (e: any){
      alert(e.message)
    }
  }
  
}
