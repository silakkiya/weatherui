import { Injectable } from '@angular/core';
import { ISummary } from './models/summary';
import { IDaytile } from './models/daytile';
// import { WeatherService } from './weather.service';
import { Http } from '@angular/http';
import * as _ from 'lodash';
import * as moment from 'moment';
@Injectable()
export class WeatherService {
  summary:ISummary;
  dayWiseMap:any;
  dayTileList:Array<IDaytile>;
  constructor(private httpService:Http) { 
    this.dayWiseMap={};
  }

  fetchWeatherInfo(cityName:string){
    const url=`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=27d43832d2a4adcb97fcbfa23db130aa`;
    this.httpService.get(url)
    .subscribe((res)=>{
      console.log(res.json());
      const data=res.json();
      this.summary = {
        cityName: data.city.name,
        day: moment(data.list[0].dt*1000).format('ddd'),
        weathercondition:data.list[0].weather[0].description
        
      };

        data.list.forEach(date => {
          // console.log(date);
          const dateValue = new Date(date.dt * 1000);
          const dayNum = dateValue.getDay();
          if (dayNum in this.dayWiseMap) {
            this.dayWiseMap[dayNum].push(date);
          } else {
            this.dayWiseMap[dayNum] = [date];
          }
        });
        console.log(this.dayWiseMap);
        console.log(this.dayWiseMap);
        this.dayTileList= _.map(this.dayWiseMap,(obj) => {
          return{
            day: moment(obj[0].dt*1000).format('ddd'),
            minTemp: _.round(obj[0].main.temp_min-270,2),
            maxTemp: _.round(obj[0].main.temp_max-270,2),
            imageURL:'assets/images/cloudy.png'
          }
         
        });
        console.log(this.dayTileList);

    });

        
  }
        
  }


