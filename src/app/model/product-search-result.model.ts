import { FacetResultsWrapper } from "./facet-results-wrapper.model";
import { Product } from "./product.model";

export class ProductSearchResult {
    products: Product[];
    facets: FacetResultsWrapper;
    totalResults: number;
    totalPages: number;
    currentPage: number;
    sortCodes: string[];
} 