import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../contracts';
import { ProductsService } from '../../../core/services/products.service';
// import { MockDataService } from '../../../shared/services/mock-data.service';
import { ProductDetailComponent } from '../../../shared/components/product-detail/product-detail.component';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, ProductDetailComponent],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  product: Product | null = null;
  isLoading = true;
  error: string | null = null;
  productId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService
    // private mockDataService: MockDataService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id && !isNaN(id)) {
        this.productId = id;
        this.loadProduct(id);
      } else {
        this.error = 'ID de producto inválido';
        this.isLoading = false;
      }
    });
  }

  private loadProduct(id: number): void {
    this.isLoading = true;
    this.error = null;

    // Backend connection (active)
    this.productsService.getPublicById(id).subscribe({
    
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

  goBack(): void {
    this.router.navigate(['/catalog/products']);
  }

  reloadProduct(): void {
    if (this.productId) {
      this.loadProduct(this.productId);
    }
  }
}
