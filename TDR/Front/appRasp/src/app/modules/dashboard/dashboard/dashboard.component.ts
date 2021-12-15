import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  showFiller = false;

  constructor(
    private auth: LoginService,
    private route: Router) { }

  ngOnInit(): void {
  }

  sesion(){
    this.auth.logout();
    this.route.navigate(['login']);
  }
}
