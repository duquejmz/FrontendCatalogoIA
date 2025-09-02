import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, CategoryNode } from '../../../contracts';
import { ProductsService } from '../../../core/services/products.service';
import { CategoriesService } from '../../../core/services/categories.service';
// import { MockDataService } from '../../../shared/services/mock-data.service';
import { AdminProductFormComponent } from '../../components/admin-product-form/admin-product-form.component';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AdminProductFormComponent],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  product: Product | null = null;
  categories: CategoryNode[] = [];
  isLoading = false;
  isEditMode = false;
  productId: number | null = null;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private categoriesService: CategoriesService
    // private mockDataService: MockDataService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id && id !== 'new') {
        this.isEditMode = true;
        this.productId = +id;
        this.loadProduct(this.productId);
      } else {
        this.isEditMode = false;
        this.initializeNewProduct();
      }
    });
  }

  private loadCategories(): void {
    // Backend connection (active)
    this.categoriesService.getAdminCategories().subscribe({
    
    // Mock connection (commented - uncomment to use mock)
    // this.mockDataService.getAdminCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      }
    });
  }

  private loadProduct(id: number): void {
    this.isLoading = true;
    this.error = null;

    // Backend connection (active)
    this.productsService.get(id).subscribe({
    
    // Mock connection (commented - uncomment to use mock)
    // this.mockDataService.getProductById(id).subscribe({
      next: (product) => {
        if (product) {
          this.product = product;
        } else {
          this.error = 'Producto no encontrado';
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el producto';
        this.isLoading = false;
        console.error('Error loading product:', err);
      }
    });
  }

  private initializeNewProduct(): void {
    this.product = {
      id: 0,
      sku: '',
      name: '',
      description: '',
      price: 0,
      categoryId: undefined,
      isActive: true,
      createdAt: new Date().toISOString(),
      images: []
    };
  }

  onSaveProduct(productData: Partial<Product>): void {
    this.isLoading = true;
    this.error = null;

    const productToSave = {
      ...productData,
      id: this.isEditMode ? this.productId! : undefined
    };

    // Backend connection (active)
    const saveObservable = this.isEditMode 
      ? this.productsService.update(this.productId!, productToSave)
      : this.productsService.create(productToSave as Omit<Product, 'id' | 'createdAt'>);

    saveObservable.subscribe({
    
    // Mock connection (commented - uncomment to use mock)
    // this.mockDataService.saveProduct(productToSave).subscribe({
      next: (savedProduct) => {
        this.isLoading = false;
        // Navigate back to products list
        this.router.navigate(['/admin/products']);
      },
      error: (err) => {
        this.error = 'Error al guardar el producto';
        this.isLoading = false;
        console.error('Error saving product:', err);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin/products']);
  }

  reloadProduct(): void {
    if (this.productId) {
      this.loadProduct(this.productId);
    }
  }
}
