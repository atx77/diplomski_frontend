import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CartService } from '../cart-page/cart.service';
import { Cart } from '../model/cart.model';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { CheckoutForm } from '../model/form/checkout-form.model';
import { CheckoutService } from './checkout.service';
import { Order } from '../model/order.model';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit, OnDestroy {

  cart$: Observable<Cart>;
  faCaretLeft = faCaretLeft;
  checkoutFormModel: CheckoutForm;
  subscription: Subscription;

  paymentMethods = [
    {
      code: 'CREDIT_CARD',
      value: 'Credit card'
    },
    {
      code: 'PAYPAL',
      value: 'PayPal'
    },
    {
      code: 'CASH_ON_DELIVERY',
      value: 'Cash on delivery'
    }
  ];

  deliveryModes = [
    {
      code: 'COURIER',
      value: 'Address delivery'
    },
    {
      code: 'EXPRESS',
      value: 'Express delivery'
    },
    {
      code: 'PERSONAL_PICKUP',
      value: 'Personal pickup'
    }
  ]

  constructor(private route: ActivatedRoute,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router) { }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.cart$ = this.cartService.getCart();
    this.checkoutFormModel = new CheckoutForm();
  }

  doCheckout(): void {
    this.subscription = this.checkoutService.createOrder(this.checkoutFormModel)
      .subscribe((order: Order) => {
        this.router.navigate(['account/order', order.code]);
      });
  }

}
