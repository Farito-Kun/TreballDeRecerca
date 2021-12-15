import { Component, OnInit } from '@angular/core';
import { multi } from './datos'
import { GetDataService } from '../../../services/get-data.service';
import { Temperatura } from '../../public/models/temperatura';
@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent implements OnInit {


  /**************************
  surveyData: Temperatura[] = [
    {
      "Humidity": '1.3',
      "Temp": '1.3',
    },
    {
      "Humidity": '2.3',
      "Temp": '2.3',
    },
    {
      "Humidity": '3.3',
      "Temp": '3.3',
    },
    {
      "Humidity": '4.3',
      "Temp": '4.3',
    }
    
  ]
 */

  listaHumeda = []
  listaTemperatura = []
  /************************** */
 /* surveyDatakaka: any[] = []
  
  surveyData = [
    { name: 'Bikes', value: 105000 },
    { name: 'Cars', value: 55000 },
    { name: 'Trucks', value: 15000 },
    { name: 'Scooter', value: 150000 },
    { name: 'Bus', value: 20000 }
  ];
  */


  multi: any[];

  // options
  legend: boolean = false;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = false;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#72efdd', '#ffd60a']
  };

  constructor(
    private servicio: GetDataService
  ) {
    this.multi=[]
    /*this.multi =

    [
      {
        "name": "Temperatura",
        "series": [
          {
            "name": "1-10-2021",
            "value": 123
          },
          {
            "name": "10-10-2021",
            "value": 45
          },
          {
            "name": "11-10-2021",
            "value": 48
          },
          {
            "name": "14-10-2021",
            "value": 85
          },
        ]
      },
      {
        "name": "Humedad",
        "series": [
          {
            "name": "1-10-2021",
            "value": "25"
          },
          {
            "name": "10-10-2021",
            "value": "34"
          },
          {
            "name": "11-10-2021",
            "value": "99"
          },
          {
            "name": "14-10-2021",
            "value": "50"
          },
        ]
      }
    ]*/
  }

  ngOnInit(){
    this.getTemperatura()
    //Object.assign(this, { multi });
  }

  /*

  multi: any = [];
  view: any[] = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
*/
  getTemperatura(){
    let litaT:any = []
    this.servicio.getTemperatura().subscribe(
      (res: Temperatura[]) =>{
        //this.surveyData = res;
        //this.multi=res


        let a;
        for (let i in res) {
          a = res[i]
          litaT.push(a)
          
        }
        console.log(litaT)

        let xx = [
         {
            "name": "Temperatura",
            "series": litaT
          },]
          this.multi=xx
      },
      err => {
        console.log("error datos gráfica")
      }
    )
  }
  
  
}
