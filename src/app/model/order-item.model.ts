import { Product } from "./product.model";

export class OrderItem {
    product: Product;
    quantity: number;
    sellingPrice: number;
    regularPrice: number;
    totalPrice: number;
    discountPercentage: number;
}