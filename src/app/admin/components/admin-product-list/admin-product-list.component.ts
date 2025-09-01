import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../contracts';

@Component({
  selector: 'app-admin-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.scss']
})
export class AdminProductListComponent {
  @Input() products: Product[] = [];
  @Input() loading = false;
  @Output() edit = new EventEmitter<Product>();
  @Output() toggle = new EventEmitter<Product>();
  @Output() delete = new EventEmitter<Product>();

  onEdit(product: Product): void {
    this.edit.emit(product);
  }

  onToggle(product: Product): void {
    this.toggle.emit(product);
  }

  onDelete(product: Product): void {
    this.delete.emit(product);
  }
}
