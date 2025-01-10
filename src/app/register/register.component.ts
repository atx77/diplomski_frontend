import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RegisterCustomerModel } from '../model/request/register-customer.model';
import { RegisterService } from './register.service';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerCustomerModel: RegisterCustomerModel;
  registrationFailed = false;
  subscription: Subscription;
  
  faExclamationCircle = faExclamationCircle;

  constructor(private router: Router,
    private registerService: RegisterService) { }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.registerCustomerModel = new RegisterCustomerModel();
  }

  register(): void {
    this.subscription = this.registerService.register(this.registerCustomerModel).subscribe(
      result => {},
      error => this.registrationFailed = true,
      () => this.router.navigate(['/login'])
    );
  }
}
