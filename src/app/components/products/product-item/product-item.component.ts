import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/model/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product!: Product;
  @Output() selectProduct = new EventEmitter<Product>();
  @Output() deleteProduct = new EventEmitter<Product>();
  @Output() editProduct = new EventEmitter<Product>();

  onSelect() {
    this.selectProduct.emit(this.product);
  }

  onDelete() {
    this.deleteProduct.emit(this.product);
  }

  onEdit() {
    this.editProduct.emit(this.product);
  }
}
