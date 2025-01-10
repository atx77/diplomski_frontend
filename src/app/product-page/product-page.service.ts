import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConstants } from '../constant/api-constants';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductPageService {

  constructor(private http: HttpClient,
    private apiConstants: ApiConstants) { }

  getProduct(productCode: string): Observable<Product> {
    return this.http.get<Product>(this.apiConstants.getProduct(productCode));
  }
}
