import { Component, OnInit } from '@angular/core';
import {Customer} from "../../common/Customer";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserPasswordDTO} from "../../common/UserPasswordDTO";
import {CustomerService} from "../../services/customer.service";
import {ToastrService} from "ngx-toastr";
import {SessionService} from "../../services/session.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  userPasswordDTO: UserPasswordDTO = {
    oldPassword: '',
    newPassword: '',
    checkPassword: '',
  };
  error = {
    message: 'Error'
  };
  passWordForm: FormGroup;
  customer!: Customer;
  constructor(private customerService: CustomerService,private toastr: ToastrService,private sessionService: SessionService,private router: Router) {
    this.passWordForm = new FormGroup({
      'password1':new FormControl(null, [Validators.minLength(6), Validators.required]),
      'password2':new FormControl(null, [Validators.minLength(6), Validators.required]),
      'password3':new FormControl(null, [Validators.minLength(6), Validators.required]),
    })
  }

  ngOnInit(): void {

  }
  updatePass(){

    this.userPasswordDTO = {
      oldPassword: this.passWordForm.value.password1,
      newPassword: this.passWordForm.value.password2,
      checkPassword: this.passWordForm.value.password3
    };
      if(this.userPasswordDTO.newPassword === this.userPasswordDTO.checkPassword){
        this.customerService.userChangePassword(this.userPasswordDTO,this.sessionService.getUser()).subscribe(data=>{
          if(JSON.stringify(data) === JSON.stringify(this.error)){
            this.toastr.error('Mật khẩu cũ không đúng','Hệ thống');
          }else{
            this.toastr.success('Đổi mật khẩu thành công','Hệ thống');
            this.router.navigateByUrl('/home');
          }
        })
      }else {
        this.toastr.error('Mật khẩu không khớp','Hệ thống');
      }
  }
}
