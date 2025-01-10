import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConstants } from '../constant/api-constants';
import { Order } from '../model/order.model';

@Injectable({
  providedIn: 'root'
})
export class AccountPageService {

  constructor(private httpClient: HttpClient,
    private apiConstants: ApiConstants) { }

  getAllOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.apiConstants.getAllOrdersForLoggedCustomer());
  }
}
