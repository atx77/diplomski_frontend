import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { CartService } from '../cart-page/cart.service';
import { ApiConstants } from '../constant/api-constants';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnDestroy {

  newestProducts$: Observable<Product[]>;
  banners$: Observable<String>;

  faCartPlus = faCartPlus;
  subscription: Subscription;

  constructor(private httpClient: HttpClient,
    private apiConstants: ApiConstants,
    private cartService: CartService,
    private router: Router) { }

  ngOnInit(): void {
    this.newestProducts$ = this.findNewestProducts();
    this.banners$ = this.getAllBanners();
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  findNewestProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.apiConstants.getNewestProducts());
  }

  addToCart(productCode: string, productName: string) {
    this.subscription = this.cartService.addProductToCart(productCode, 1)
    .subscribe(
      result => {
        this.addAlert(productName);
      },
      error => {
      this.router.navigate(['login'])
    });
  }

  addAlert(productName: string) {
    var alertHtml = '<div class="alert alert-dismissible alert-success" role="alert">&nbsp;Dodali ste proizvod \'' + productName + '\' u košaricu<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
    var wrapper = document.getElementById('alert-message-wrapper');
    wrapper.insertAdjacentHTML('beforeend', alertHtml);
  }

  getAllBanners(): Observable<String> {
    return this.httpClient.get<String>(this.apiConstants.getBanners());
  }
}
