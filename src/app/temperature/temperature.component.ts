import { Component, OnInit, Input } from '@angular/core';
import { ITemperature } from '../models/temperature';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit {
@Input() tempInfo:ITemperature;
  constructor() { }

  ngOnInit() {
  }

}
