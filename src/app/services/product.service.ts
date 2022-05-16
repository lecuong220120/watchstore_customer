import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = 'https://watchstore3.herokuapp.com/api/products';
  // url = 'http://watchstore2.herokuapp.com/api/products';

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get(this.url);
  }

  getLasted() {
    return this.httpClient.get(this.url+'/latest');
  }

  getBestSeller() {
    return this.httpClient.get(this.url+'/bestseller');
  }

  getRated() {
    return this.httpClient.get(this.url+'/rated');
  }

  getOne(id: number) {
    return this.httpClient.get(this.url+'/'+id);
  }

  getByCategory(id: number) {
    return this.httpClient.get(this.url+'/category1/'+id);
  }

  getSuggest(categoryId: number, productId: number) {
    return this.httpClient.get(this.url+'/suggest/'+categoryId+"/"+productId);
  }
  findByManufacturer(id: number){
    return this.httpClient.get(this.url + '/manufacturer/' + id);
  }
  findByName(name: string){
    return this.httpClient.get(this.url + '/findName/'+name);
  }
  findByCategory(id: number){
    return this.httpClient.get(this.url + '/category1/' + id);
  }
  findByCategoryAndManufacturer(id1: number, id2: number){
    return this.httpClient.get(this.url + '/' + id1 + '/' + id2);
  }
}
