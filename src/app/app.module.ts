import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localeHr from '@angular/common/locales/hr';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccountPageComponent } from './account-page/account-page.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AddTokenInterceptor } from './interceptor/add-token.interceptor';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { RegisterComponent } from './register/register.component';
import { SearchPageComponent } from './search-page/search-page.component';

registerLocaleData(localeHr, 'hr')

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    CategoryPageComponent,
    ProductListComponent,
    ProductPageComponent,
    SearchPageComponent,
    RegisterComponent,
    CartPageComponent,
    CheckoutPageComponent,
    OrderPageComponent,
    AccountPageComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddTokenInterceptor,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'hr'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
