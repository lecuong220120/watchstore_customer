export class Manufacturer{
  'manufacturerId' : number;
  'manufacturerName': string;
  'status' : number;
  constructor(manufacturerId: number, manufacturerName: string) {
    this.manufacturerId = manufacturerId;
    this.manufacturerName = manufacturerName;
  }
}
