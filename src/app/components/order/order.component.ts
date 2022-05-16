import { Component, OnInit } from '@angular/core';
import {Customer} from "../../common/Customer";
import {Order} from "../../common/Order";
import {CustomerService} from "../../services/customer.service";
import {ToastrService} from "ngx-toastr";
import {SessionService} from "../../services/session.service";
import {NavigationEnd, Router} from "@angular/router";
import {OrderService} from "../../services/order.service";
import {WebSocketService} from "../../services/web-socket.service";
import {NotificationService} from "../../services/notification.service";
import Swal from "sweetalert2";
import {ChatMessage} from "../../common/ChatMessage";
import {Notification} from "../../common/Notification";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  customer!: Customer;
  orders!: Order[];
  check!:boolean;
  page: number = 1;

  done!: number;

  constructor(private customerService: CustomerService,
              private toastr: ToastrService,
              private sessionService: SessionService,
              private router: Router,
              private orderService: OrderService,
              private webSocketService: WebSocketService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.webSocketService.openWebSocket();
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
    this.getCustomer();
    this.getOrder();

  }
  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }
  getCustomer() {
    let email = this.sessionService.getUser();
    this.customerService.getByEmail(email).subscribe(data => {
      this.customer = data as Customer;
    }, error => {
      this.toastr.error('Lỗi thông tin', 'Hệ thống')
      window.location.href = ('/');
    })
  }

  getOrder() {
    let email = this.sessionService.getUser();
    this.orderService.get(email).subscribe(data => {
      this.orders = data as Order[];
      this.done = 0;
      this.orders.forEach(o => {
        if (o.status === 2) {
          this.done += 1
        }
      })
    }, error => {
      this.toastr.error('Lỗi server', 'Hệ thống');
    })
  }
  onButtonClick($event: any) {
    const clickedElement = $event.target ;
    console.log(clickedElement);
    console.log($event.target.value);
    if (clickedElement.nodeName === 'A') {
      const isActivated = clickedElement.parentElement.querySelector('.active');
      if (isActivated) {
        isActivated.classList.remove('active');
      }

      // clickedElement.className = clickedElement.append(' active');
      clickedElement.className += ' active';
    }
  }
  cancel(id: number) {
    if(id===-1) {
      return;
    }
    Swal.fire({
      title: 'Bạn có muốn huỷ đơn hàng này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonText: 'Không',
      confirmButtonText: 'Huỷ'
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.cancel(id).subscribe(data => {
          this.getOrder();
          this.sendMessage(id);
          this.toastr.success('Huỷ đơn hàng thành công!', 'Hệ thống');
        }, error => {
          this.toastr.error('Lỗi server', 'Hệ thống');
        })
      }
    })

  }

  sendMessage(id:number) {
    let chatMessage = new ChatMessage(this.customer.name, ' đã huỷ một đơn hàng');
    this.notificationService.post(new Notification(0, this.customer.name + ' đã huỷ một đơn hàng ('+id+')')).subscribe(data => {
      this.webSocketService.sendMessage(chatMessage);
    })
  }

  finish() {
    this.ngOnInit();
  }
  findOrder(id: number){
    if(id === 0){
      this.check = true;
    }else{
      this.check = false;
    }
    this.orderService.findOrder(id,this.customer).subscribe(data=>{
      this.orders = data as Order[];
    })
  }
}
