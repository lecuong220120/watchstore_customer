import {Category} from "./Category";
import {Manufacturer} from "./Manufacturer";

export class History{
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

  constructor(productId: number, name: string, quantity: number, price: number, discount: number, image: string, description: string, materialLanyard: string, color: string, shape: string, sizeGlass: string, enteredDate: Date, category: Category, status: boolean, sold: number, manufacturer: Manufacturer) {
    this.productId = productId;
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.discount = discount;
    this.image = image;
    this.description = description;
    this.materialLanyard = materialLanyard;
    this.color = color;
    this.shape = shape;
    this.sizeGlass = sizeGlass;
    this.enteredDate = enteredDate;
    this.category = category;
    this.status = status;
    this.sold = sold;
    this.manufacturer = manufacturer;
  }
}
