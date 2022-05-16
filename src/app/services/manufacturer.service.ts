import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Manufacturer} from "../common/Manufacturer";

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {
  url = "https://watchstore1.herokuapp.com/api/manufacturer";
  constructor(private httpClient : HttpClient) { }
  getAll() {
    return this.httpClient.get(this.url);
  }
  getOne(id : number){
    return this.httpClient.get(this.url + '/' +id);
  }
  post(manufacturer : Manufacturer){
    return this.httpClient.post(this.url,manufacturer);
  }
  put(manufactuer : Manufacturer, id : number) {
    return this.httpClient.put(this.url + '/' + id, manufactuer);
  }
  delete(id : number){
    return this.httpClient.delete(this.url + '/' + id);
  }
}
