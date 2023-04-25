import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';

@Injectable({
  providedIn: 'root'
})
export class MapserviceService {

  [x: string]: any;
  capitals: string = '/assets/data/usa-capitals.geojson';
  testa:any ; 

  constructor(private http: HttpClient) { }

}
