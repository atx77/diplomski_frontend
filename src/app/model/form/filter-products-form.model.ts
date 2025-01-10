export class FilterProductsForm {
    brands: string[] = [];
    categories: string[] = [];
    minPrice: number = null;
    maxPrice: number = null;
    isOnSale: boolean = false;
    sort: string = 'RELEVANCE';
}