import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductSearchResult } from '../model/product-search-result.model';
import { FilterProductsForm } from '../model/form/filter-products-form.model';
import { faCartPlus, faFilter } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../cart-page/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input() productSearchResult: ProductSearchResult;
  @Input() searchQuery: string;
  @Input() filterFormModel: FilterProductsForm;
  @Output() filterChanged = new EventEmitter<FilterProductsForm>();
  @Output() pageChanged = new EventEmitter<number>();

  showAllCategories: boolean = false;
  showAllBrands: boolean = false;

  visibleCategories: any[] = [];
  remainingCategories: any[] = [];

  visibleBrands: any[] = [];
  remainingBrands: any[] = [];

  facetsInitialSize = 5;

  faCartPlus = faCartPlus;
  faFilter = faFilter;
  addedProductName: string;

  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Initialize sort if not set
    if (!this.filterFormModel.sort && this.productSearchResult?.sortCodes) {
      this.filterFormModel.sort = this.productSearchResult.sortCodes[0];
    }
  }

  ngOnChanges(): void {
    if (this.productSearchResult?.facets?.categories) {
      this.visibleCategories = this.productSearchResult.facets.categories.slice(0, this.facetsInitialSize);
      this.remainingCategories = this.productSearchResult.facets.categories.slice(this.facetsInitialSize);
    }

    if (this.productSearchResult?.facets?.brands) {
      this.visibleBrands = this.productSearchResult.facets.brands.slice(0, this.facetsInitialSize);
      this.remainingBrands = this.productSearchResult.facets.brands.slice(this.facetsInitialSize);
    }
  }

  toggleShowAllCategories(): void {
    this.showAllCategories = !this.showAllCategories;
  }

  toggleShowAllBrands(): void {
    this.showAllBrands = !this.showAllBrands;
  }

  filterResults(): void {
    this.filterChanged.emit(this.filterFormModel);
  }

  handleClickedBrands(brand: string, event: any): void {
    if (event.target.checked === true) {
      if (!this.filterFormModel.brands.includes(brand)) {
        this.filterFormModel.brands.push(brand);
      }
    } else {
      this.filterFormModel.brands = this.filterFormModel.brands.filter(b => b !== brand);
    }
  }

  handleClickedCategories(category: string, event: any): void {
    if (event.target.checked === true) {
      if (!this.filterFormModel.categories.includes(category)) {
        this.filterFormModel.categories.push(category);
      }
    } else {
      this.filterFormModel.categories = this.filterFormModel.categories.filter(c => c !== category);
    }
  }

  addToCart(productCode: string, productName: string) {
    this.addedProductName = productName;
    this.cartService.addProductToCart(productCode, 1)
      .subscribe(
        result => {
          this.addAlert(productName);
        },
        error => {
          this.router.navigate(['login'])
        });
  }

  addAlert(productName: string) {
    const alertHtml = `<div class="alert alert-dismissible alert-success" role="alert">
      &nbsp;Dodali ste proizvod '${productName}' u košaricu
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
    const wrapper = document.getElementById('alert-message-wrapper');
    wrapper.insertAdjacentHTML('beforeend', alertHtml);
  }

  isCategoryAvailable(category: string): boolean {
    return this.productSearchResult.facets.categories.some(facet => facet.value === category);
  }

  isBrandAvailable(brand: string): boolean {
    return this.productSearchResult.facets.brands.some(facet => facet.value === brand);
  }


  getPageNumbers(): number[] {
    const totalPages = this.productSearchResult.totalPages;
    const currentPage = this.productSearchResult.currentPage;
    const pageNumbers = [];

    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }

  onPageChange(newPage: number): void {
    this.pageChanged.emit(newPage);
  }
}
