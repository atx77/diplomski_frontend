import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConstants } from '../constant/api-constants';
import { ProductSearchResult } from '../model/product-search-result.model';
import { FilterProductsForm } from '../model/form/filter-products-form.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryPageService {

  constructor(private http: HttpClient, private apiConstants: ApiConstants) { }

  getCategoryResult(
    categoryCode: string,
    filterForm: FilterProductsForm,
    page: number,
    pageSize: number
  ): Observable<ProductSearchResult> {
    let httpParams = new HttpParams();

    if (filterForm.brands && filterForm.brands.length > 0) {
      filterForm.brands.forEach(brand => {
        httpParams = httpParams.append('brand', brand);
      });
    }

    if (filterForm.categories && filterForm.categories.length > 0) {
      filterForm.categories.forEach(category => {
        httpParams = httpParams.append('categories', category);
      });
    }

    if (filterForm.minPrice != null) {
      httpParams = httpParams.set('minPrice', filterForm.minPrice.toString());
    }
    if (filterForm.maxPrice != null) {
      httpParams = httpParams.set('maxPrice', filterForm.maxPrice.toString());
    }
    if (filterForm.isOnSale != null) {
      httpParams = httpParams.set('isOnSale', filterForm.isOnSale.toString());
    }
    if (filterForm.sort) {
      httpParams = httpParams.set('sort', filterForm.sort);
    }
    if (page != null) {
      httpParams = httpParams.set('page', page.toString());
    }
    if (pageSize != null) {
      httpParams = httpParams.set('pageSize', pageSize.toString());
    }

    return this.http.get<ProductSearchResult>(
      this.apiConstants.getCategory(categoryCode),
      { params: httpParams }
    );
  }
}
