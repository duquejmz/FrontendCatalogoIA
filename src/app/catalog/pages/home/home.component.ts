import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../../contracts';
import { ProductsService } from '../../../core/services/products.service';
// import { MockDataService } from '../../../shared/services/mock-data.service';
import { ProductGridComponent } from '../../../shared/components/product-grid/product-grid.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductGridComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  featuredProducts: Product[] = [];
  isLoading = true;
  error: string | null = null;
  
  // Hero carousel
  slides: string[] = [
    // Puedes reemplazar estas URLs por imágenes locales en /public o /assets
    'https://cdn.lifehack.org/wp-content/uploads/2014/10/10-Essential-Tech-Products-That-Are-Always-a-Good-Investment.jpeg',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop',
    'https://www.semana.com/resizer/v2/LUQES3KHJZD27OF6CNQPRNSGKE.jpg?auth=2284a065d7491029f517a1c6650b3ada7fa29fdc68dc12b7cd5f8d613b1b0daf&smart=true&quality=75&width=1280&fitfill=false'
  ];
  currentSlide = 0;
  private autoplayId: any = null;

  constructor(
    private productsService: ProductsService
    // private mockDataService: MockDataService
  ) {}

  ngOnInit(): void {
    this.loadFeaturedProducts();
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  loadFeaturedProducts(): void {
    this.isLoading = true;
    this.error = null;

    // Backend connection (active)
    this.productsService.getFeatured().subscribe({
    
    // Mock connection (commented - uncomment to use mock)
    // this.mockDataService.getFeaturedProducts().subscribe({
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

  // Carousel controls
  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    this.restartAutoplay();
  }

  private startAutoplay(): void {
    if (this.autoplayId) return;
    this.autoplayId = setInterval(() => this.nextSlide(), 5000);
  }

  private stopAutoplay(): void {
    if (this.autoplayId) {
      clearInterval(this.autoplayId);
      this.autoplayId = null;
    }
  }

  private restartAutoplay(): void {
    this.stopAutoplay();
    this.startAutoplay();
  }
}
