import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryNode } from '../../../contracts';
import { MockDataService } from '../../../shared/services/mock-data.service';
import { AdminCategoryTreeComponent } from '../../components/admin-category-tree/admin-category-tree.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, AdminCategoryTreeComponent],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: CategoryNode[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.isLoading = true;
    this.error = null;

    this.mockDataService.getAdminCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar categorías';
        this.isLoading = false;
        console.error('Error loading categories:', err);
      }
    });
  }

  onCreateCategory(): void {
    // In a real app, you would open a modal or navigate to a form
    const newCategory: CategoryNode = {
      id: this.getNextId(),
      name: 'Nueva Categoría',
      isActive: true,
      children: []
    };
    
    this.categories.push(newCategory);
    console.log('Create category:', newCategory);
  }

  onEditCategory(category: CategoryNode): void {
    // In a real app, you would open a modal or navigate to a form
    console.log('Edit category:', category);
    // For demo, just rename it
    category.name = category.name + ' (Editada)';
  }

  onDeleteCategory(category: CategoryNode): void {
    if (confirm(`¿Estás seguro de que deseas eliminar "${category.name}"?`)) {
      this.categories = this.removeCategory(this.categories, category.id);
      console.log('Delete category:', category.id);
    }
  }

  onToggleCategory(category: CategoryNode): void {
    category.isActive = !category.isActive;
    console.log('Toggle category:', category);
  }

  private getNextId(): number {
    const allIds = this.getAllIds(this.categories);
    return Math.max(...allIds, 0) + 1;
  }

  private getAllIds(categories: CategoryNode[]): number[] {
    const ids: number[] = [];
    for (const category of categories) {
      ids.push(category.id);
      if (category.children) {
        ids.push(...this.getAllIds(category.children));
      }
    }
    return ids;
  }

  private removeCategory(categories: CategoryNode[], id: number): CategoryNode[] {
    return categories.filter(category => {
      if (category.id === id) {
        return false;
      }
      if (category.children) {
        category.children = this.removeCategory(category.children, id);
      }
      return true;
    });
  }
}
