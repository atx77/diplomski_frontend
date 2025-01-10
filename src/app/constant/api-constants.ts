import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ApiConstants {

    API_URL_HOST = 'http://localhost:8080/api';

    constructor() { }

    login(): string {
        return this.API_URL_HOST + '/user/authenticate';
    }

    register(): string {
        return this.API_URL_HOST + '/user/register';
    }

    getLoggedUser(): string {
        return this.API_URL_HOST + '/user';
    }

    getCategory(categoryCode: string): string {
        return this.API_URL_HOST + '/category/' + categoryCode
    }

    getCategoryFilters(categoryCode: string): string {
        return this.API_URL_HOST + '/category/' + categoryCode + '/all-filters'
    }

    getCategoryTree(): string {
        return this.API_URL_HOST + '/category/tree';
    }

    search(text: string): string {
        return this.API_URL_HOST + '/search/' + text;
    }

    getSearchFilters(categoryCode: string): string {
        return this.API_URL_HOST + '/search/' + categoryCode + '/all-filters'
    }

    getProduct(productCode: string) {
        return this.API_URL_HOST + '/product/' + productCode;
    }

    getNewestProducts() {
        return this.API_URL_HOST + '/product/newest';
    }

    getCart() {
        return this.API_URL_HOST + '/cart';
    }

    removeProductFromCart() {
        return this.API_URL_HOST + '/cart/remove';
    }

    changeProductQuantityInCart() {
        return this.API_URL_HOST + '/cart/change-quantity';
    }

    addProductToCart() {
        return this.API_URL_HOST + '/cart/add';
    }

    createOrder() {
        return this.API_URL_HOST + '/order';
    }

    getOrderByCode(orderCode: string) {
        return this.API_URL_HOST + '/order/' + orderCode;
    }

    getAllOrdersForLoggedCustomer() {
        return this.API_URL_HOST + '/order/get-all';
    }

    updatePersonalInformation() {
        return this.API_URL_HOST + '/account/update';
    }

    getBanners() {
        return this.API_URL_HOST + '/banner';
    }
}