import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, PagedResult } from '../../contracts';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly adminUrl = `${environment.apiBaseUrl}/admin/products/search`;
  private readonly publicUrl = `${environment.apiBaseUrl}/products`;

  constructor(private http: HttpClient) {}

  // Admin methods
  list(page: number = 1, pageSize: number = 10): Observable<PagedResult<Product>> {
    return this.http.get<PagedResult<Product>>(`${this.adminUrl}?page=${page}&pageSize=${pageSize}`);
  }

  get(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.adminUrl}/${id}`);
  }

  create(product: Omit<Product, 'id' | 'createdAt'>): Observable<Product> {
    return this.http.post<Product>(this.adminUrl, product);
  }

  update(id: number, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.adminUrl}/${id}`, product);
  }

  toggle(id: number): Observable<Product> {
    return this.http.patch<Product>(`${this.adminUrl}/${id}/toggle`, {});
  }

  uploadImage(productId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post(`${this.adminUrl}/${productId}/images`, formData);
  }

  deleteImage(productId: number, imageId: number): Observable<void> {
    return this.http.delete<void>(`${this.adminUrl}/${productId}/images/${imageId}`);
  }

  // Public methods for catalog
  getFeatured(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.publicUrl}/featured`);
  }

  getPublicList(page: number = 1, pageSize: number = 12, filters?: any): Observable<PagedResult<Product>> {
    let params = `page=${page}&pageSize=${pageSize}`;
    
    if (filters) {
      if (filters.search) params += `&search=${encodeURIComponent(filters.search)}`;
      if (filters.categoryId) params += `&categoryId=${filters.categoryId}`;
      if (filters.minPrice) params += `&minPrice=${filters.minPrice}`;
      if (filters.maxPrice) params += `&maxPrice=${filters.maxPrice}`;
      if (filters.sortBy) params += `&sortBy=${filters.sortBy}`;
      if (filters.sortDirection) params += `&sortDirection=${filters.sortDirection}`;
    }
    
    return this.http.get<PagedResult<Product>>(`${this.publicUrl}?${params}`);
  }

  getPublicById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.publicUrl}/${id}`);
  }
}
