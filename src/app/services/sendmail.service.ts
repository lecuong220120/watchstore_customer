import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SendmailService {

  url = 'https://watchstore1.herokuapp.com/api/send-mail'

  constructor(private httpClient: HttpClient) { }

  sendMailOtp(email:String) {
    return this.httpClient.post(this.url+'/otp', email);
  }
}