import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Category } from '../model/category.model';
import { ApiConstants } from '../constant/api-constants';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private http: HttpClient,
    private apiConstants: ApiConstants) { }

  getCategoryTree(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiConstants.getCategoryTree());
  }
}
