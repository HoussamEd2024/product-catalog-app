import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }
  host=environment.host;



  getAllProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${(this.host)}/products`)
  }
  getSelectedProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.host}/products?selected=true`)
  }
  getAvailableProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.host}/products?available=true`)
  }

  searchProducts(keyword:string):Observable<Product[]>{
    return this.http.get<Product[]>(`${this.host}/products?name_like=${keyword}`)
  }
  /*select(product:Product):Observable<Product>{
    product.selected=!product.selected;
    return this.http.put<Product>(`${this.host}/products/${product.id}`,product);
  }*/

  select(product: Product): Observable<Product> {
    return this.http.patch<Product>(`${this.host}/products/${product.id}`, {
      selected: !product.selected,
    });
  }

  deleteProduct(product:Product):Observable<void>{
    return this.http.delete<void>(`${this.host}/products/${product.id}`);
  }


  save(product:Product):Observable<Product>{
    return this.http.post<Product>(`${this.host}/products`,product);
  }

  getProductById(id:number):Observable<Product>{
    return this.http.get<Product>(`${this.host}/products/${id}`);
  }

  editProduct(product:Product):Observable<Product>{
    return this.http.put<Product>(`${this.host}/products/${product.id}`,product);
  }


}
