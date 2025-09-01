import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../contracts';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  @Input() product: Product | null = null;
  
  selectedImageIndex = 0;

  selectImage(index: number): void {
    this.selectedImageIndex = index;
  }

  get selectedImage() {
    return this.product?.images?.[this.selectedImageIndex];
  }
}
