import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCaretRight, faMinusCircle, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Cart } from '../model/cart.model';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  cart$: Observable<Cart>;

  faCaretRight = faCaretRight;
  faMinusCircle = faMinusCircle;
  faPlus = faPlus;
  faMinus = faMinus;

  constructor(private route: ActivatedRoute,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.cart$ = this.cartService.getCart();
  }

  removeProduct(productCode: string) {
    this.cart$ = this.cartService.removeProductFromCart(productCode);
  }

  decreaseProductQuantity(productCode: string, currentQuantity: number) {
    this.changeProductQuantity(productCode, currentQuantity-1);
  }

  increaseProductQuantity(productCode: string, currentQuantity: number) {
    this.changeProductQuantity(productCode, currentQuantity+1);
  }

  changeProductQuantity(productCode: string, quantity: number) {
    this.cart$ = this.cartService.changeProductQuantityInCart(productCode, quantity)
  }
}
