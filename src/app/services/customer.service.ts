import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../common/Customer';
import {UserPasswordDTO} from "../common/UserPasswordDTO";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  url = "https://watchstore2.herokuapp.com/api/auth";

  constructor(private httpClient: HttpClient) { }

  getOne(id: number) {
    return this.httpClient.get(this.url + '/' + id);
  }

  getByEmail(email: string) {
    return this.httpClient.get(this.url + '/email/' + email);
  }

  update(id: number, customer: Customer) {
    return this.httpClient.put(this.url + '/' + id, customer);
  }
  userChangePassword(userPasswordDTO: UserPasswordDTO, email: string) {
    return this.httpClient.put(this.url + '/changePassword/'+email,userPasswordDTO);
  }
}
