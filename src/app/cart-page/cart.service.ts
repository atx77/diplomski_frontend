import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConstants } from '../constant/api-constants';
import { Cart } from '../model/cart.model';
import { AddProductToCartRequest } from '../model/request/add-product-to-cart.model';
import { ChangeProductQuantityInCartRequest } from '../model/request/change-product-quantity-in-cart.model';
import { RemoveProductFromCartRequest } from '../model/request/remove-product-from-cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient,
    private apiConstants: ApiConstants) { }

  getCart(): Observable<Cart> {
    return this.httpClient.get<Cart>(this.apiConstants.getCart());
  }

  removeProductFromCart(productCode: string): Observable<Cart> {
    let request: RemoveProductFromCartRequest = {
      productCode: productCode
    }
    return this.httpClient.post<Cart>(this.apiConstants.removeProductFromCart(), request);
  }

  changeProductQuantityInCart(productCode: string, quantity: number): Observable<Cart> {
    let request: ChangeProductQuantityInCartRequest = {
      productCode: productCode,
      quantity: quantity
    }
    return this.httpClient.post<Cart>(this.apiConstants.changeProductQuantityInCart(), request);
  }

  addProductToCart(productCode: string, quantity: number): Observable<string> {
    let request: AddProductToCartRequest = {
      productCode: productCode,
      quantity: quantity
    }
    return this.httpClient.post<string>(this.apiConstants.addProductToCart(), request);
  }
}

