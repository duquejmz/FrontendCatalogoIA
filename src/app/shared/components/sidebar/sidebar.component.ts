import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  children?: MenuItem[];
  requiresAuth?: boolean;
  adminOnly?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  isCollapsed = false;
  expandedItems: Set<string> = new Set();

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  menuItems: MenuItem[] = [
    {
      label: 'Inicio',
      icon: 'fas fa-home',
      route: '/'
    },
    {
      label: 'Catálogo',
      icon: 'fas fa-shopping-bag',
      children: [
        {
          label: 'Ver Productos',
          icon: 'fas fa-th-large',
          route: '/catalog/products'
        },
        {
          label: 'Categorías',
          icon: 'fas fa-tags',
          route: '/catalog/categories'
        }
      ]
    },
    {
      label: 'Administración',
      icon: 'fas fa-cog',
      requiresAuth: true,
      adminOnly: true,
      children: [
        {
          label: 'Productos',
          icon: 'fas fa-box',
          route: '/admin/products'
        },
        {
          label: 'Categorías',
          icon: 'fas fa-tags',
          route: '/admin/categories'
        },
        {
          label: 'Nuevo Producto',
          icon: 'fas fa-plus',
          route: '/admin/products/new'
        }
      ]
    }
  ];

  get filteredMenuItems(): MenuItem[] {
    return this.menuItems.filter(item => {
      if (item.requiresAuth && !this.isAuthenticated) {
        return false;
      }
      if (item.adminOnly && !this.isAuthenticated) {
        return false;
      }
      return true;
    });
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleExpanded(itemLabel: string): void {
    if (this.expandedItems.has(itemLabel)) {
      this.expandedItems.delete(itemLabel);
    } else {
      this.expandedItems.add(itemLabel);
    }
  }

  isExpanded(itemLabel: string): boolean {
    return this.expandedItems.has(itemLabel);
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
