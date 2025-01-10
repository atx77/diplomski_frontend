import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConstants } from '../constant/api-constants';
import { RegisterCustomerModel } from '../model/request/register-customer.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient,
    private apiConstants: ApiConstants) { }

  register(registerCustomerModel: RegisterCustomerModel): Observable<string> {
    return this.httpClient.post<string>(this.apiConstants.register(), registerCustomerModel);
  }
}
