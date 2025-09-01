import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CategoryNode } from '../../../contracts';

@Component({
  selector: 'app-product-filters',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss']
})
export class ProductFiltersComponent {
  @Input() categories: CategoryNode[] = [];
  @Output() filtersChange = new EventEmitter<any>();
  @Output() sortChange = new EventEmitter<any>();

  filtersForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.filtersForm = this.fb.group({
      search: [''],
      categoryId: [null],
      minPrice: [null],
      maxPrice: [null],
      sortBy: ['name'],
      sortDirection: ['asc']
    });
  }

  onFiltersChange(): void {
    const formValue = this.filtersForm.value;
    const filters = {
      search: formValue.search || undefined,
      categoryId: formValue.categoryId || undefined,
      minPrice: formValue.minPrice || undefined,
      maxPrice: formValue.maxPrice || undefined
    };
    this.filtersChange.emit(filters);
  }

  onSortChange(): void {
    const formValue = this.filtersForm.value;
    const sort = {
      sortBy: formValue.sortBy,
      sortDirection: formValue.sortDirection
    };
    this.sortChange.emit(sort);
  }
}
