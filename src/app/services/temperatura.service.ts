import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const urlBase = 'https://api.openweathermap.org/data/2.5/weather';
const appId = '0e7824df675b6153df86c10bdff901e9';

@Injectable({
  providedIn: 'root'
})
export class TemperaturaService {

  constructor(private http: HttpClient) { }

  getEstadoTiempo(ciudad: string, codigo: string){

    const url = `${urlBase}?q=${ciudad},${codigo}&appid=${appId}`;

    return this.http.get(url);

  }
}
