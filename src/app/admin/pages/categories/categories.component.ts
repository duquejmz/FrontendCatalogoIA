import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryNode } from '../../../contracts';
import { CategoriesService } from '../../../core/services/categories.service';
// import { MockDataService } from '../../../shared/services/mock-data.service';
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

  constructor(
    private categoriesService: CategoriesService
    // private mockDataService: MockDataService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.isLoading = true;
    this.error = null;

    // Backend connection (active)
    this.categoriesService.getAdminCategories().subscribe({
    
    // Mock connection (commented - uncomment to use mock)
    // this.mockDataService.getAdminCategories().subscribe({
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
    const newCategory: Omit<CategoryNode, 'id'> = {
      name: 'Nueva Categoría',
      isActive: true,
      children: []
    };
    
    // Backend connection (active)
    this.categoriesService.createCategory(newCategory).subscribe({
    
    // Mock connection (commented - uncomment to use mock)
    // this.categories.push(newCategory as CategoryNode);
    // console.log('Category created:', newCategory);
      next: (category) => {
        this.categories.push(category);
        console.log('Category created:', category);
      },
      error: (err) => {
        console.error('Error creating category:', err);
      }
    });
  }

  onEditCategory(category: CategoryNode): void {
    const updatedCategory = { name: category.name + ' (Editada)' };
    
    // Backend connection (active)
    this.categoriesService.updateCategory(category.id, updatedCategory).subscribe({
    
    // Mock connection (commented - uncomment to use mock)
    // category.name = category.name + ' (Editada)';
    // console.log('Category updated:', category);
      next: (updated) => {
        const index = this.categories.findIndex(c => c.id === category.id);
        if (index >= 0) {
          this.categories[index] = updated;
        }
        console.log('Category updated:', updated);
      },
      error: (err) => {
        console.error('Error updating category:', err);
      }
    });
  }

  onDeleteCategory(category: CategoryNode): void {
    if (confirm(`¿Estás seguro de que deseas eliminar "${category.name}"?`)) {
      // Backend connection (active)
      this.categoriesService.deleteCategory(category.id).subscribe({
      
      // Mock connection (commented - uncomment to use mock)
      // this.categories = this.removeCategory(this.categories, category.id);
      // console.log('Category deleted:', category.id);
        next: () => {
          this.categories = this.removeCategory(this.categories, category.id);
          console.log('Category deleted:', category.id);
        },
        error: (err) => {
          console.error('Error deleting category:', err);
        }
      });
    }
  }

  onToggleCategory(category: CategoryNode): void {
    const updatedCategory = { isActive: !category.isActive };
    
    // Backend connection (active)
    this.categoriesService.updateCategory(category.id, updatedCategory).subscribe({
    
    // Mock connection (commented - uncomment to use mock)
    // category.isActive = !category.isActive;
    // console.log('Category toggled:', category);
      next: (updated) => {
        const index = this.categories.findIndex(c => c.id === category.id);
        if (index >= 0) {
          this.categories[index] = updated;
        }
        console.log('Category toggled:', updated);
      },
      error: (err) => {
        console.error('Error toggling category:', err);
        // Revert the change on error
        category.isActive = !category.isActive;
      }
    });
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
