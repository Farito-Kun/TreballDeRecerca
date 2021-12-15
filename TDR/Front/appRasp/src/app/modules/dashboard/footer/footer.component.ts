import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(
    private toast: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  enviarForm(){
    this.toast.success('Gracias por informarnos. :) ', 'Correo enviado correctamente', {
      timeOut: 3000,
    });
    this.router.navigate(['/dashboard']);

  }

}
