import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductSearchResult } from '../model/product-search-result.model';
import { FilterProductsForm } from '../model/form/filter-products-form.model';
import { CategoryPageService } from './category-page.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {

  categoryCode: string;
  productSearchResult$: Observable<ProductSearchResult>;
  filterFormModel: FilterProductsForm = new FilterProductsForm();
  page: number = 1;
  pageSize: number = 16;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryPageService: CategoryPageService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.categoryCode = this.route.snapshot.paramMap.get('code');
    this.performSearch();
  }

  performSearch(): void {
    this.productSearchResult$ = this.categoryPageService.getCategoryResult(
      this.categoryCode,
      this.filterFormModel,
      this.page,
      this.pageSize
    ).pipe(
      map(result => {
        const availableBrands = result.facets.brands.map(facet => facet.value);
        this.filterFormModel.brands = this.filterFormModel.brands.filter(brand => availableBrands.includes(brand));

        const availableCategories = result.facets.categories.map(facet => facet.value);
        this.filterFormModel.categories = this.filterFormModel.categories.filter(category => availableCategories.includes(category));

        return result;
      })
    );
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.performSearch();
  }

  onFilterChanged(newFilterModel: FilterProductsForm): void {
    this.filterFormModel = newFilterModel;
    this.page = 1;
    this.performSearch();
  }
}
