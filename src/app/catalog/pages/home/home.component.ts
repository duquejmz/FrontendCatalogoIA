import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../../contracts';
import { MockDataService } from '../../../shared/services/mock-data.service';
import { ProductGridComponent } from '../../../shared/components/product-grid/product-grid.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductGridComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    this.loadFeaturedProducts();
  }

  loadFeaturedProducts(): void {
    this.isLoading = true;
    this.error = null;

    this.mockDataService.getFeaturedProducts().subscribe({
      next: (products) => {
        this.featuredProducts = products;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar productos destacados';
        this.isLoading = false;
        console.error('Error loading featured products:', err);
      }
    });
  }
}
