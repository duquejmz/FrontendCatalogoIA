import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryNode } from '../../../contracts';

@Component({
  selector: 'app-admin-category-tree',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-category-tree.component.html',
  styleUrls: ['./admin-category-tree.component.scss']
})
export class AdminCategoryTreeComponent {
  @Input() categories: CategoryNode[] = [];
  @Output() edit = new EventEmitter<CategoryNode>();
  @Output() delete = new EventEmitter<CategoryNode>();
  @Output() toggle = new EventEmitter<CategoryNode>();

  expandedNodes = new Set<number>();

  toggleNode(nodeId: number): void {
    if (this.expandedNodes.has(nodeId)) {
      this.expandedNodes.delete(nodeId);
    } else {
      this.expandedNodes.add(nodeId);
    }
  }

  isExpanded(nodeId: number): boolean {
    return this.expandedNodes.has(nodeId);
  }

  onEdit(category: CategoryNode): void {
    this.edit.emit(category);
  }

  onDelete(category: CategoryNode): void {
    this.delete.emit(category);
  }

  onToggle(category: CategoryNode): void {
    this.toggle.emit(category);
  }
}
