import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtToken } from '../model/jwt-token.model';
import { LoginCredentials } from '../model/request/login-credential.model';
import { User } from '../model/user.model';
import { UserService } from '../user/user.service';
import { LoginService } from './login.service';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginCredentials: LoginCredentials;
  loginFailed = false;

  faExclamationCircle = faExclamationCircle;

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginCredentials = new LoginCredentials();
  }

  login() {
    this.loginFailed = false;
    this.loginService.login(this.loginCredentials).subscribe(
      (jwtToken: JwtToken) => {
        localStorage.setItem('bearer-token', jwtToken.token);

        this.userService.getLoggedUser().subscribe((user: User) => {
          this.userService.setLoggedUser(user);
          this.router.navigate(['/']);
        });
      },
      () => this.loginFailed = true
    )
  }
}
