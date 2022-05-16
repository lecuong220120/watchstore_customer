import { Component, OnInit } from '@angular/core';
import {HistoryService} from "../../services/history.service";
import {ProductService} from "../../services/product.service";
import {SessionService} from "../../services/session.service";
import {History} from "../../common/History";
import {Product} from "../../common/Product";
import {Rate} from "../../common/Rate";
import {Customer} from "../../common/Customer";
import {Favorites} from "../../common/Favorites";
import {Cart} from "../../common/Cart";
import {CartDetail} from "../../common/CartDetail";
import {CartService} from "../../services/cart.service";
import {CustomerService} from "../../services/customer.service";
import {RateService} from "../../services/rate.service";
import {ToastrService} from "ngx-toastr";
import {FavoritesService} from "../../services/favorites.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  productSeller!:Product[];
  productLatest!:Product[];
  productRated!:Product[];
  key: string = '';
  isLoading = true;
  page: number = 1;
  customer!: Customer;
  favorite!: Favorites;
  favorites!: Favorites[];

  cart!: Cart;
  cartDetail!: CartDetail;
  cartDetails!: CartDetail[];

  rates!: Rate[];
  countRate!: number;

  slideConfig = {"slidesToShow": 7, "slidesToScroll": 2, "autoplay": true};
  histories!: History[];
  products!:Product[];
  product!:Product;
  constructor(private historyService: HistoryService, private productService: ProductService,private sessionService: SessionService,
              private cartService: CartService,
              private customerService: CustomerService,
              private rateService: RateService,
              private toastr: ToastrService,
              private favoriteService: FavoritesService,
              private router: Router) { }

  ngOnInit(): void {
    this.getAll();
    this.getAllRate();
  }
  getAll(){
    this.historyService.getAll().subscribe(data=>{
      this.histories = data as History[];
    })
  }


  getAllRate() {
    this.rateService.getAll().subscribe(data => {
      this.rates = data as Rate[];
    })
  }

  getAvgRate(id: number): number {
    let avgRating: number = 0;
    this.countRate = 0;
    for (const item of this.rates) {
      if (item.product.productId === id) {
        avgRating += item.rating;
        this.countRate++;
      }
    }
    return Math.round(avgRating/this.countRate * 10) / 10;
  }


  toggleLike(id: number) {
    let email = this.sessionService.getUser();
    if (email == null) {
      this.router.navigate(['/sign-form']);
      this.toastr.info('Hãy đăng nhập để sử dụng dịch vụ của chúng tôi', 'Hệ thống');
      return;
    }
    this.favoriteService.getByProductIdAndEmail(id, email).subscribe(data => {
      if (data == null) {
        this.customerService.getByEmail(email).subscribe(data => {
          this.customer = data as Customer;
          this.favoriteService.post(new Favorites(0, new Customer(this.customer.userId), new Product(id))).subscribe(data => {
            this.toastr.success('Thêm thành công!', 'Hệ thống');
            this.favoriteService.getByEmail(email).subscribe(data=>{
              this.favorites = data as Favorites[];
              this.favoriteService.setLength(this.favorites.length);
            }, error=>{
              this.toastr.error('Lỗi truy xuất dữ liệu!', 'Hệ thống');
            })
          }, error => {
            this.toastr.error('Thêm thất bại!', 'Hệ thống');
          })
        })
      } else {
        this.favorite = data as Favorites;
        this.favoriteService.delete(this.favorite.favoriteId).subscribe(data => {
          this.toastr.info('Đã xoá ra khỏi danh sách yêu thích!', 'Hệ thống');
          this.favoriteService.getByEmail(email).subscribe(data=>{
            this.favorites = data as Favorites[];
            this.favoriteService.setLength(this.favorites.length);
          }, error=>{
            this.toastr.error('Lỗi truy xuất dữ liệu!', 'Hệ thống');
          })
        }, error => {
          this.toastr.error('Lỗi!', 'Hệ thống');
        })
      }
    })
  }

  addCart(productId: number, price: number) {
    let email = this.sessionService.getUser();
    if (email == null) {
      this.router.navigate(['/sign-form']);
      this.toastr.info('Hãy đăng nhập để sử dụng dịch vụ của chúng tôi', 'Hệ thống');
      return;
    }
    this.cartService.getCart(email).subscribe(data => {
      this.cart = data as Cart;
      this.cartDetail = new CartDetail(0, 1, price, new Product(productId), new Cart(this.cart.cartId));
      this.cartService.postDetail(this.cartDetail).subscribe(data => {
        this.toastr.success('Thêm vào giỏ hàng thành công!', 'Hệ thống!');
        this.cartService.getAllDetail(this.cart.cartId).subscribe(data => {
          this.cartDetails = data as CartDetail[];
          this.cartService.setLength(this.cartDetails.length);
        })
      }, error => {
        this.toastr.error('Sản phẩm này có thể đã hết hàng!', 'Hệ thống');
        this.router.navigate(['/home']);
        window.location.href = "/";
      })
    })
  }
}
