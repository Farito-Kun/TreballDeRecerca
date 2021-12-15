
import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import { GetDataService } from '../../../services/get-data.service';
//Toaster alert
import { ToastrService } from 'ngx-toastr';

//Logs interface
import { Email } from '../../public/models/email';
import { MatSort } from '@angular/material/sort';


//Expand 
import {MatAccordion} from '@angular/material/expansion';
import { FormControl, FormGroup, Validators } from '@angular/forms';


import { Router } from '@angular/router';
import { User } from '../../public/models/user';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  //Form
  basicForm: FormGroup;

  //user
  usuario : User;
  
  listaEmail: Email[] = [];
  displayedColumns: string[] = ['id_user', 'email', 'status'];
  dataSource = new MatTableDataSource(this.listaEmail);

  //Paginación
  @ViewChild(MatPaginator) 
  set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
  }

  //Sorting
  @ViewChild(MatSort, {static: false})
  set sort(value: MatSort) {
    this.dataSource.sort = value;
  }
  
  //Expand 
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  constructor(
    private _service:GetDataService,
    private toastr: ToastrService,
    private router: Router
  ) { 
    //Get user
    this.usuario = JSON.parse(localStorage.getItem('user') || '{}' );

    //Form 
    this.basicForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
    })
  }

  ngOnInit(): void {
    this.getEmails()
  }

  addEmail(){

    const emailData = this.basicForm.value
    let m: Email = {
      "id_user": this.usuario.uid,
      "email": emailData.email,
      "status": "true"
    }

    this._service.createEmail(m).subscribe(
      (res: any) => {
        this.toastr.success('Correo añadido correctamente.', 'Correo', {
          timeOut: 3000,
        });
        this.getEmails()

      },
      err => {
        this.toastr.error('Error a la hora de eliminar correo.', 'Correo', {
          timeOut: 3000,
        });
      }
    );
    
  }
  
  getEmails(){

    this._service.getEmailsOwner(this.usuario.uid).subscribe(
      (res:Email[]) => {
        this.listaEmail= res;
        this.dataSource.data = this.listaEmail
      },
      err => {
        this.toastr.error('Error a la hora de obtener los emails.', 'Sección Correos', {
          timeOut: 3000,
        });
      }
    );
  }

  deleteEmail(obj:Email){
    this._service.deleteEmail(obj.email).subscribe(
      (res:any) => {
        this.toastr.success('Correo creado correctamente.', 'Correos', {
          timeOut: 3000,
        });
        this.getEmails()
      },
      err => {
        this.toastr.error('Error a la hora de eliminar correo.', 'Correos', {
          timeOut: 3000,
        });
      }
    );
  }

  disponible(obj:Email){

    let m = {
      'id_user': obj.id_user,
      'email': obj.email,
      'status': 'false',
    }

    this._service.disponible(m).subscribe(
      (res: any)=> {
        this.toastr.success('Correo no-disponible.', 'Correo', {
          timeOut: 3000,
        });
        this.getEmails()
      },
      (err: any)=> {
        this.toastr.error('Error a la hora de poner correo no-disponible.', 'Correo', {
          timeOut: 3000,
        });
      },
    )
  }

  noDisponible(obj:Email){
    let m = {
      'id_user': obj.id_user,
      'email': obj.email,
      'status': 'true',
    }

    this._service.noDisponible(m).subscribe(
      (res: any)=> {
        this.toastr.success('Correo disponible.', 'Correo', {
          timeOut: 3000,
        });
        this.getEmails()
      },
      (err: any)=> {
        this.toastr.error('Error a la hora de poner correo disponible.', 'Correo', {
          timeOut: 3000,
        });
      },
    )

  }

  //******* Pagination method ***********************************
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //******* Filter method ***************************************
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}