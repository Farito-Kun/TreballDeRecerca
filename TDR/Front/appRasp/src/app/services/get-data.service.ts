import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { Email } from '../modules/public/models/email';
import { ApiRutas } from '../../app.rutas'
import { Logs } from '../modules/public/models/logs';
import { Temperatura } from '../modules/public/models/temperatura';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  rutas = new ApiRutas()

  constructor(
    private _http: HttpClient
  ) { }




  getEmailsOwner(own: string){
    return this._http.get<Email[]>(this.rutas.getEmailsOwner+own)    
  }


  //---------------- Logs --------------------------
  getLogs(){
    return this._http.get<Logs[]>(this.rutas.getLogs)
  }

  getTemperatura(){
    return this._http.get<Temperatura[]>(this.rutas.getTemperatura)
  }

  //----------------- Email -------------------------
  createEmail(email: Email){
    return this._http.post<Email>(this.rutas.addEmail, email)
  }
  
  getEmail(idUSer:string){
    return this._http.get<Email[]>(this.rutas.getEmailsOwner+idUSer)
  }

  deleteEmail(idUSer:string){
    return this._http.delete(this.rutas.deleteEmails+idUSer)
  }


  disponible(email:Email){
    return this._http.put(this.rutas.disponible,email)
  }

  noDisponible(email:Email){
    return this._http.put(this.rutas.disponible,email)
  }




}
