import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, PagedResult } from '../../contracts';
import { environment } from '../../../environments/environment';

export interface CatalogFilters {
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export interface CatalogSort {
  field: 'name' | 'price' | 'createdAt';
  direction: 'asc' | 'desc';
}

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private readonly baseUrl = `${environment.apiBaseUrl}/api/v1/catalog`;

  constructor(private http: HttpClient) {}

  list(
    page: number = 1, 
    pageSize: number = 12,
    filters?: CatalogFilters,
    sort?: CatalogSort
  ): Observable<PagedResult<Product>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (filters) {
      if (filters.categoryId) params = params.set('categoryId', filters.categoryId.toString());
      if (filters.minPrice) params = params.set('minPrice', filters.minPrice.toString());
      if (filters.maxPrice) params = params.set('maxPrice', filters.maxPrice.toString());
      if (filters.search) params = params.set('search', filters.search);
    }

    if (sort) {
      params = params.set('sortBy', sort.field).set('sortDir', sort.direction);
    }

    return this.http.get<PagedResult<Product>>(`${this.baseUrl}/products`, { params });
  }

  detail(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }
}
