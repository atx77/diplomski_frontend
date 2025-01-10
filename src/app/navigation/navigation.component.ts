import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../model/category.model';
import { NavigationService } from './navigation.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  categories$: Observable<Category[]>;

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.getNavigation();
  }

  getNavigation() {
    this.categories$ = this.navigationService.getCategoryTree();
  }
}
