import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryDTO } from '../model/CategoryDTO';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { ProductDTO } from '../model/ProductDTO';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  categoryAPI: string = 'http://localhost:8080/category';
  productAPI: string = 'http://localhost:8080/product';
  
  
  constructor(private http: HttpClient, private useService: UserService) { 
  }
  
  addProduct(formData: FormData): Observable<string> {
    return this.http.post(this.productAPI, formData, { responseType: 'text'});
  }
  
  getAllCategories(): Observable<CategoryDTO[]>{
    return this.http.get<CategoryDTO[]>(this.categoryAPI);
  }

  getAllUserProducts(): Observable<ProductDTO[]>{
    const userId = this.useService.getUserId();
    console.log('user id: ', userId);
    
    return this.http.get<ProductDTO[]>(this.productAPI+'/user/'+userId);
  }
}
