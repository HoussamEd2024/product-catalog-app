import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../services/product.service";
import {Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {AppDataState, DataStateEnum} from "../../state/product.state";
import {Product} from "../../model/product.model";
import {catchError, map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$: Observable<AppDataState<Product[]>> | null = null;
  readonly DataStateEnum = DataStateEnum;

  constructor(private productService: ProductsService, private router: Router) {}

  ngOnInit(): void {}

  handleFilterProducts(filter: string) {
    switch (filter) {
      case 'all':
        this.loadProducts(this.productService.getAllProducts());
        break;
      case 'selected':
        this.loadProducts(this.productService.getSelectedProducts());
        break;
      case 'available':
        this.loadProducts(this.productService.getAvailableProducts());
        break;
    }
  }

  handleSearchProducts(keyword: string) {
    this.loadProducts(this.productService.searchProducts(keyword));
  }

  handleAddNewProduct() {
    this.router.navigateByUrl('/newProduct');
  }

  handleSelectProduct(product: Product) {
    this.productService.select(product).subscribe();
  }

  handleDeleteProduct(product: Product) {
    if (confirm('Etes-vous sûr ?')) {
      this.productService.deleteProduct(product).subscribe(() => this.handleFilterProducts('all'));
    }
  }

  handleEditProduct(product: Product) {
    this.router.navigateByUrl('/editProduct/' + product.id);
  }

private loadProducts(observable: Observable<Product[]>) {
    this.products$ = observable.pipe(
      map(data => ({ dataState: DataStateEnum.LOADED, data })),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
    );
  }
}
