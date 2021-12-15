import { Component, OnInit } from '@angular/core';

import { GetDataService } from '../../../services/get-data.service';


@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {

  constructor(
    private _data: GetDataService 
  ) { }

  ngOnInit(): void {
    console.log("------All emial-----------")
  
    this._data.getEmailsOwner("Younes").subscribe(
      (res:any) => {
        console.log("Emails: ", res)
      },
      err => {
        console.log("Error emails: ", err)
      }
    );

    console.log("-------------------------")
  }

}
