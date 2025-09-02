import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Product, PagedResult } from '../../../contracts';
import { ProductsService } from '../../../core/services/products.service';
// import { MockDataService } from '../../../shared/services/mock-data.service';
import { AdminProductListComponent } from '../../components/admin-product-list/admin-product-list.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, AdminProductListComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  isLoading = false;
  error: string | null = null;
  
  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  totalPages = 0;

  constructor(
    private productsService: ProductsService,
    // private mockDataService: MockDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.error = null;

    // Load all products for admin (no filters)
    // Backend connection (active)
    this.productsService.list(this.currentPage, this.pageSize).subscribe({
    
    // Mock connection (commented - uncomment to use mock)
    // this.mockDataService.getProducts(this.currentPage, this.pageSize).subscribe({
      next: (result: PagedResult<Product>) => {
        this.products = result.items;
        this.totalItems = result.total;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar productos';
        this.isLoading = false;
        console.error('Error loading products:', err);
      }
    });
  }

  onEditProduct(product: Product): void {
    this.router.navigate(['/admin/products', product.id]);
  }

  onToggleProduct(product: Product): void {
    // Backend connection (active)
    this.productsService.toggle(product.id).subscribe({
    
    // Mock connection (commented - uncomment to use mock)
    // this.mockDataService.toggleProduct(product.id).subscribe({
      next: (updatedProduct) => {
        // Update the product in the list
        const index = this.products.findIndex(p => p.id === product.id);
        if (index >= 0) {
          this.products[index] = updatedProduct;
        }
      },
      error: (err) => {
        console.error('Error toggling product:', err);
        // You could show a toast notification here
      }
    });
  }

  onDeleteProduct(product: Product): void {
    if (confirm(`¿Estás seguro de que deseas eliminar "${product.name}"?`)) {
      // In a real app, you would call a delete service
      console.log('Delete product:', product.id);
      // For now, just remove from the list
      this.products = this.products.filter(p => p.id !== product.id);
      this.totalItems--;
    }
  }

  onCreateProduct(): void {
    this.router.navigate(['/admin/products/new']);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadProducts();
    }
  }

  get pages(): number[] {
    const pages = [];
    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(this.totalPages, this.currentPage + 2);
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }
}
