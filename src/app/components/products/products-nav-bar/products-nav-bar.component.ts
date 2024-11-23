import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.css']
})
export class ProductsNavBarComponent {
  @Output() filterProducts = new EventEmitter<string>();
  @Output() searchProducts = new EventEmitter<string>();
  @Output() addNewProduct = new EventEmitter<void>();

  onFilterProducts(filter: string) {
    this.filterProducts.emit(filter);
  }

  onSearch(keyword: string) {
    this.searchProducts.emit(keyword);
  }

  onNewProduct() {
    this.addNewProduct.emit();
  }
}
