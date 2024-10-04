import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryDTO } from '../model/CategoryDTO';
import { UserService } from './user.service';
import { ProductDTO } from '../model/ProductDTO';
import { AuthService } from './auth.service';
import { FilterDTO } from '../model/FilterDTO';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  categoryAPI: string = 'http://localhost:8080/category';
  productAPI: string = 'http://localhost:8080/product';
  cartAPI: string = 'http://localhost:8080/cart';
  
  
  constructor(private http: HttpClient, private useService: UserService, private authService: AuthService) {
  }
  
  getProduct(id: string): Observable<ProductDTO> {
    return this.http.get<ProductDTO>(this.productAPI + '/' + id);
  }
  addProduct(formData: FormData): Observable<string> {
    return this.http.post(this.productAPI, formData, { responseType: 'text' });
  }
  
  getAllCategories(): Observable<CategoryDTO[]> {
    return this.http.get<CategoryDTO[]>(this.categoryAPI);
  }
  
  getAllUserProducts(): Observable<ProductDTO[]> {
    const userId = this.useService.getUserId();
    console.log('user id: ', userId);

    return this.http.get<ProductDTO[]>(this.productAPI + '/user/' + userId);
  }

  getFilteredProducts(filterDTO: FilterDTO): Observable<ProductDTO[]> {
    return this.http.post<ProductDTO[]>(this.productAPI + '/filter', filterDTO);
  }


  
  getFeaturedProducts(): Observable<ProductDTO[]> {
    return this.http.get<ProductDTO[]>(this.productAPI + '/featured');
  }

  getTrendingProducts(): Observable<ProductDTO[]> {
    return this.http.get<ProductDTO[]>(this.productAPI + '/trending');
  }

  addProductToCart(productId: string, quantity: Number) {
    const userId: string = this.authService.getUserId();

    this.http.post(this.cartAPI, {userId, productId, quantity}, { responseType: 'text'}).subscribe(
      (response) => {
        console.log(response);
      }, 
      (error) => {
        console.log(error);
        
      })
  }

  
}
