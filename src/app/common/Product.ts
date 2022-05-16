import { Category } from "./Category";
import {Manufacturer} from "./Manufacturer";

export class Product {
  'productId':number;
  'name':string;
  'quantity': number;
  'price': number;
  'discount':number;
  'image': string;
  'description': string;
  'materialLanyard': string;
  'color': string;
  'shape': string;
  'sizeGlass': string;
  'enteredDate': Date;
  'category': Category;
  'status': boolean;
  'sold': number;
  'manufacturer': Manufacturer;
    constructor(id:number) {
        this.productId = id;
    }
}
