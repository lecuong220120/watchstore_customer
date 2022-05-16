import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  error = {
    message: 'no email'
  };
  status = 'Nhập email lấy lại mật khẩu';
  ok = {
    message: 'OK'
  };
  postForm: FormGroup;
  emailFormControl: any;

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private userService: AuthService) {
    this.postForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email])
    })
  }

  ngOnInit(): void {
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true });
  }

  submit() {
    if (this.postForm.valid) {
      this.userService.forgotPassword(this.postForm.value.email).subscribe(data => {
        this.toastr.success('Chúng tôi đã gửi 1 đường dẫn đến mail của bạn, hãy kiểm tra!', 'Hệ thống');
        this.modalService.dismissAll();
        this.postForm = new FormGroup({
          'email': new FormControl(null, [Validators.required, Validators.email])
        })
      }, error => {
        if (error.status == 404) {
          this.toastr.error('Email này chưa đăng kí tài khoản!', 'Hệ thống');
        } else {
          this.toastr.error('Lỗi', 'Hệ thống');
        }
      })
    }

  }
  getForgotPassword(): void {
    if (this.postForm.valid) {
      this.userService.getForgotPassword(this.postForm.value.email).subscribe(data => {
        if (JSON.stringify(data) === JSON.stringify(this.error)) {
          this.toastr.error('Email không tồn tại, hãy kiểm tra lại','Hệ thống')
        } else if (JSON.stringify(data) === JSON.stringify(this.ok)) {
          this.toastr.success('Lấy mật khẩu thành công! Hãy kiểm tra hòm thư email của bạn!', 'Hệ thống');
          console.log(this.status);
        }
      });
    }
  }
}
