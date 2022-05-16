import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../common/Cart';
import {Customer} from "../common/Customer";


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url = "https://watchstore1.herokuapp.com/api/orders";

  urlOrderDetail = "https://watchstore1.herokuapp.com/api/orderDetail";

  constructor(private httpClient: HttpClient) { }

  post(email: string,paymentId: number, cart: Cart) {
    return this.httpClient.post(this.url+'/'+email+'/'+paymentId, cart);
  }

  get(email:string) {
    return this.httpClient.get(this.url+'/user/'+email);
  }

  getById(id:number) {
    return this.httpClient.get(this.url+'/'+id);
  }

  getByOrder(id:number) {
    return this.httpClient.get(this.urlOrderDetail+'/order/'+id);
  }

  cancel(id: number) {
    return this.httpClient.get(this.url+'/cancel/'+id);
  }
  findOrder(id:number, user: Customer){
    return this.httpClient.post(this.url+'/findOrder/'+id, user);
  }
}
