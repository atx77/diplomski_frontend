import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowRight, faCopyright, faPowerOff, faSearch, faShoppingCart, faUserCircle, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from './login/login.service';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'Webshop';

  faSearch = faSearch;
  faShoppingCart = faShoppingCart;
  faUserPlus = faUserPlus;
  faArrowRight = faArrowRight;
  faCopyright = faCopyright;
  faUserCircle = faUserCircle;
  faPowerOff = faPowerOff;

  searchText: string;

  constructor(private router: Router,
    private loginService: LoginService,
    private userService: UserService) {}

  logout() {
    this.loginService.logout();
    this.userService.setLoggedUser(null);
    this.router.navigate(['/']);
  }

  isUserLoggedIn(): boolean {
    return this.userService.isUserLoggedIn();
  }

  search(): void {
    this.router.navigate(['search', this.searchText]);
  }
}
