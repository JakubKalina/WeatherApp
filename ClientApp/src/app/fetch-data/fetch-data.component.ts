import { Component, Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  styleUrls: ['./fetch-data.component.css']
})

@Injectable()
export class FetchDataComponent {
  public forecasts: WeatherForecast[];
  public fetchedData: FetchWeather;
  cityName: string;
  weatherIconName: string;

  // Dane pobrane z API
  weatherUrl: string;

  constructor(private httpClient: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    httpClient.get<WeatherForecast[]>(baseUrl + 'api/SampleData/WeatherForecasts').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
  }

  fetchWeatherData() {
    this.httpClient.get<FetchWeather>(this.weatherUrl).subscribe(result => {
      this.fetchedData = result;
      this.fetchedData.main.temp -= 273;
      this.setWeatherIconName();
    }, error => console.error(error));
  }
  // Pobiera podaną przez użytkownika nazwę szukanego miasta
  fetchCityName(event: Event) {
    this.cityName = (<HTMLInputElement>event.target).value;
  }

  // Ustala odpowiedni adres do wykonania zapytania
  onUpdateCityName(event: Event) {
    if (this.cityName == null) {
      console.log('to pole jest wymagane');
    }
    this.weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + this.cityName + '&APPID=b619d522ef3145f4aa1018d261697a4f';
    this.fetchWeatherData();
  }

  // Wybiera odpowiednią ikonę pogodową do wyświetlenia
  setWeatherIconName() {
    //#region Ikony
    switch (this.fetchedData.weather[0].main) {
      case 'Clear':
        if (this.fetchedData.weather[0].icon.includes('d') === true) {
          this.weatherIconName = 'sunny.png';
        } else {
          this.weatherIconName = 'moon.png';
        }
      break;
      case 'Clouds':
      if (this.fetchedData.weather[0].icon.includes('d') === true) {
        this.weatherIconName = 'cloudsAndSun.png';
      } else {
        this.weatherIconName = 'cloudyNight.png';
      }
      break;
      case 'Tornado':
      this.weatherIconName = 'tourbillion.png';
      break;
      case 'Snow':
      this.weatherIconName = 'snow.png';
      break;
      case 'Drizzle':
      this.weatherIconName = 'rain.png';
      break;
      case 'Rain':
      this.weatherIconName = 'rain.png';
      break;
      case 'Mist':
      this.weatherIconName = 'fog.png';
      break;
      case 'Smoke':
      this.weatherIconName = 'fog.png';
      break;
      case 'Haze':
      this.weatherIconName = 'fog.png';
      break;
      case 'Dust':
      this.weatherIconName = 'fog.png';
      break;
      case 'Fog':
      this.weatherIconName = 'fog.png';
      break;
      case 'Sand':
      this.weatherIconName = 'fog.png';
      break;
      case 'Ash':
      this.weatherIconName = 'fog.png';
      break;
      case 'Squall':
      this.weatherIconName = 'fog.png';
      break;
    }
    //#endregion
  }


}

interface WeatherForecast {
  dateFormatted: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}



interface FetchWeather {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  wind: Wind;
  sys: Sys;
  name: string;
  cod: string;
}

interface Coord {
  lon: number;
  lat: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Main {
  temp: number;
  pressure: number;
  humidity: number;
  temp_min: number;
  temp_max: number;
}

interface Wind {
  speed: number;
  deg: number;
}

interface Sys {
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}
