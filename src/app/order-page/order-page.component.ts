import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from '../model/order.model';
import { OrderPageService } from './order-page.service';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {

  orderCode: string;
  order$: Observable<Order>;

  faCaretLeft = faCaretLeft;

  constructor(private route: ActivatedRoute,
    private orderPageService: OrderPageService) { }

  ngOnInit(): void {
    this.orderCode = this.route.snapshot.paramMap.get('code');
    this.getOrder(this.orderCode);
  }

  getOrder(code: string) {
    this.order$ = this.orderPageService.getOrderByCode(code);
  }
}
