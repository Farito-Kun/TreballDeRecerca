import { STRING_TYPE } from '@angular/compiler';
import { Injectable } from '@angular/core';

/**
 * Import lib of Firebase
 */
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from '@firebase/app-compat';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  authState : any; 

  constructor
  (
    private auth: AngularFireAuth,
    private toast :ToastrService,
  ) { 

    this.auth.authState.subscribe(user => {
      if (user) {
        this.authState = user;
        localStorage.setItem('user', JSON.stringify(this.authState));
        JSON.stringify(localStorage.getItem('user'))

      } else {
        localStorage.setItem('user', "");
        JSON.stringify(localStorage.getItem('user'))
      }
    })
  }

  loginMethod(email:string, pass:string){
    return this.auth.signInWithEmailAndPassword(email,pass);
  }

  logout(){
    return this.auth.signOut().then(() => {
      localStorage.setItem('user',"null");
    })
  }

  registrar(user: string, password: string){
    return this.auth.createUserWithEmailAndPassword(user, password);
  }

  verificarCorreo(){
    this.auth.currentUser.then(user => {
      if(user){
        user.sendEmailVerification();
        this.toast.error('Hemos enviado un email de verificación a la cuenta:'+ user.email, 'Verificación Email.', {
          timeOut: 3000,
        });
      }else{
        this.toast.error('Error a la hora de verificar email.', 'Error verificación.', {
          timeOut: 3000,
        });
      }
    })
  }

  facebookAuth(){
    return this.auth.signInWithPopup( new firebase.auth.FacebookAuthProvider())
  }

  googleAuth(){
    return this.auth.signInWithPopup( new firebase.auth.GoogleAuthProvider())
  }

  get autentificado(){
    this.auth.authState.subscribe((user) => {
      this.authState = user;
    })

    if (this.authState) {
      return true
    }else return false
  }
  
}


