import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConstants } from '../constant/api-constants';
import { CheckoutForm } from '../model/form/checkout-form.model';
import { Order } from '../model/order.model';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private httpClient: HttpClient, 
    private apiConstants: ApiConstants) { }

    createOrder(checkoutForm: CheckoutForm): Observable<Order> {
      return this.httpClient.post<Order>(this.apiConstants.createOrder(), checkoutForm);
    }
}
