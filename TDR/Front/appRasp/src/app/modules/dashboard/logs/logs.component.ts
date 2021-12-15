import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import { GetDataService } from '../../../services/get-data.service';
//Toaster alert
import { ToastrService } from 'ngx-toastr';

//Logs interface
import { Logs } from '../../public/models/logs';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  listaLogs: Logs[] = [];
  displayedColumns: string[] = ['error', 'fecha', 'tipo'];
  dataSource = new MatTableDataSource(this.listaLogs);

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
  
  constructor(
    private _service:GetDataService,
    private toastr: ToastrService,
  ) { 
  }

  ngOnInit(): void {
    this.getLogs()
  }

  getLogs(){
    this._service.getLogs().subscribe(
      (res:Logs[]) => {
        this.listaLogs= res;
        this.dataSource.data = this.listaLogs
      },
      err => {
        this.toastr.error('Error a la hora de obtener los logs.', 'Sección Logs', {
          timeOut: 3000,
        });
      }
    );
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