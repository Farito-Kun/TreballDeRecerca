import { Component, OnInit } from '@angular/core';

import { User }from '../../../modules/public/models/user'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario : User;

  constructor() { 
    this.usuario = JSON.parse(localStorage.getItem('user') || '{}' );
  }

  ngOnInit(): void {
  }

  hayFoto(){
    if (this.usuario.photoURL!=null) return true
    else return false
  }
}
