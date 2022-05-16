import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Manufacturer} from "../common/Manufacturer";
import {History} from "../common/History";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  url = "https://watchstore3.herokuapp.com/api/history";

  constructor(private httpClient: HttpClient) {
  }

  getAll() {
    return this.httpClient.get(this.url);
  }

  getOne(id: number) {
    return this.httpClient.get(this.url + '/' + id);
  }

  post(history: History) {
    return this.httpClient.post(this.url, history);
  }

  delete() {
    return this.httpClient.delete(this.url);
  }

}
