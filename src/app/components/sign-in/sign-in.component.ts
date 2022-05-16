import { Component, OnInit } from '@angular/core';
import {Register} from "../../common/Register";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SendmailService} from "../../services/sendmail.service";
import {FavoritesService} from "../../services/favorites.service";
import {SessionService} from "../../services/session.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {CustomerService} from "../../services/customer.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  show: any;
  register !: Register;
  registerForm!: FormGroup;

  constructor(private sendMailService: SendmailService,
              private favoriteService: FavoritesService,
              private sessionService: SessionService,
              private toastr: ToastrService,
              private router: Router,
              private authService: AuthService,
              private userService: CustomerService) {
    this.registerForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'name': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'status': new FormControl(true),
      'gender': new FormControl(true),
      'image': new FormControl('https://res.cloudinary.com/veggie-shop/image/upload/v1633795994/users/mnoryxp056ohm0b4gcrj.png'),
      'address': new FormControl(null, [Validators.required]),
      'phone': new FormControl(null, [Validators.required, Validators.minLength(10), Validators.pattern('(0)[0-9]{9}')]),
      'registerDate': new FormControl(new Date()),
      'role': new FormControl(["USER"]),
    });
  }

  ngOnInit(): void {
    this.checkLogin();
  }
  checkLogin() {
    if (this.sessionService.getUser() != null) {
      this.router.navigate(['/home']);
      window.location.href = ('/');
    }
  }
  sign_up() {
    if (this.registerForm.invalid) {
      this.toastr.error('Hãy nhập đầy đủ thông tin!', 'Hệ thống');
      return;
    }
    this.register = this.registerForm.value;
  this.authService.register(this.register).subscribe(data => {
      Swal.fire({
        icon: 'success',
        title: 'Đăng kí thành công! Mời bạn đăng nhập',
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(() => {
          window.location.href = ('/sign-form');
        },
        500);
    }, error => {
      if (error.status == 400) {
        this.toastr.error('Email này đã tồn tại trên hệ thống !', 'Hệ thống');
      }else{
        this.toastr.error(error.message, 'Hệ thống');
      }
    });

  }
}
