import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, PagedResult } from '../../contracts';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly baseUrl = `${environment.apiBaseUrl}/api/v1/admin/products`;

  constructor(private http: HttpClient) {}

  list(page: number = 1, pageSize: number = 10): Observable<PagedResult<Product>> {
    return this.http.get<PagedResult<Product>>(`${this.baseUrl}?page=${page}&pageSize=${pageSize}`);
  }

  get(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  create(product: Omit<Product, 'id' | 'createdAt'>): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  update(id: number, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, product);
  }

  toggle(id: number): Observable<Product> {
    return this.http.patch<Product>(`${this.baseUrl}/${id}/toggle`, {});
  }

  uploadImage(productId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post(`${this.baseUrl}/${productId}/images`, formData);
  }

  deleteImage(productId: number, imageId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${productId}/images/${imageId}`);
  }
}
