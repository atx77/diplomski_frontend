import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountPageComponent } from './account-page/account-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoggedInAuthGuardService } from './interceptor/logged-in-auth-guard.service';
import { LoginComponent } from './login/login.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { RegisterComponent } from './register/register.component';
import { SearchPageComponent } from './search-page/search-page.component';


const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'category/:code',
    component: CategoryPageComponent
  },
  {
    path: 'product/:code',
    component: ProductPageComponent
  },
  {
    path: 'search/:text',
    component: SearchPageComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'cart',
    component: CartPageComponent,
    canActivate: [LoggedInAuthGuardService]
  },
  {
    path: 'checkout',
    component: CheckoutPageComponent,
    canActivate: [LoggedInAuthGuardService]
  },
  {
    path: 'account',
    component: AccountPageComponent,
    canActivate: [LoggedInAuthGuardService]
  },
  {
    path: 'account/order/:code',
    component: OrderPageComponent,
    canActivate: [LoggedInAuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
