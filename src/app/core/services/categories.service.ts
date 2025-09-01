import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryNode } from '../../contracts';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private readonly adminUrl = `${environment.apiBaseUrl}/api/v1/admin/categories`;
  private readonly publicUrl = `${environment.apiBaseUrl}/api/v1/categories`;

  constructor(private http: HttpClient) {}

  // Admin endpoints
  getAdminCategories(): Observable<CategoryNode[]> {
    return this.http.get<CategoryNode[]>(this.adminUrl);
  }

  createCategory(category: Omit<CategoryNode, 'id'>): Observable<CategoryNode> {
    return this.http.post<CategoryNode>(this.adminUrl, category);
  }

  updateCategory(id: number, category: Partial<CategoryNode>): Observable<CategoryNode> {
    return this.http.put<CategoryNode>(`${this.adminUrl}/${id}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.adminUrl}/${id}`);
  }

  // Public endpoint
  listPublic(): Observable<CategoryNode[]> {
    return this.http.get<CategoryNode[]>(this.publicUrl);
  }
}
