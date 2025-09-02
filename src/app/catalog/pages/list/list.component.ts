import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, CategoryNode, PagedResult } from '../../../contracts';
import { ProductsService } from '../../../core/services/products.service';
import { CategoriesService } from '../../../core/services/categories.service';
// import { MockDataService } from '../../../shared/services/mock-data.service';
import { ProductGridComponent } from '../../../shared/components/product-grid/product-grid.component';
import { ProductFiltersComponent } from '../../../shared/components/product-filters/product-filters.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ProductGridComponent, ProductFiltersComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  products: Product[] = [];
  categories: CategoryNode[] = [];
  isLoading = false;
  error: string | null = null;
  Math = Math; // Expose Math to template
  
  // Pagination
  currentPage = 1;
  pageSize = 12;
  totalItems = 0;
  totalPages = 0;
  
  // Filters
  currentFilters: any = {};

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    // private mockDataService: MockDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  private loadCategories(): void {
    // Backend connection (active)
    this.categoriesService.listPublic().subscribe({
    
    // Mock connection (commented - uncomment to use mock)
    // this.mockDataService.getPublicCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      }
    });
  }

  loadProducts(): void {
    this.isLoading = true;
    this.error = null;

    // Backend connection (active)
    this.productsService.getPublicList(this.currentPage, this.pageSize, this.currentFilters).subscribe({
    
    // Mock connection (commented - uncomment to use mock)
    // this.mockDataService.getProducts(this.currentPage, this.pageSize, this.currentFilters).subscribe({
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

  onFiltersChange(filters: any): void {
    this.currentFilters = { ...filters };
    this.currentPage = 1; // Reset to first page
    this.loadProducts();
  }

  onSortChange(sortData: any): void {
    this.currentFilters = { 
      ...this.currentFilters, 
      sortBy: sortData.sortBy,
      sortDirection: sortData.sortDirection 
    };
    this.loadProducts();
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadProducts();
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
