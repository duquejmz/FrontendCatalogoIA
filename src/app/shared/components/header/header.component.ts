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
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  // Estados para controlar menús
  isUserMenuOpen = false;
  isMobileMenuOpen = false;
  expandedDropdowns: Set<string> = new Set();

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

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  get currentUser() {
    return this.authService.getCurrentUser();
  }

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

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleDropdown(itemLabel: string): void {
    if (this.expandedDropdowns.has(itemLabel)) {
      this.expandedDropdowns.delete(itemLabel);
    } else {
      this.expandedDropdowns.add(itemLabel);
    }
  }

  isDropdownExpanded(itemLabel: string): boolean {
    return this.expandedDropdowns.has(itemLabel);
  }

  onLogin(): void {
    this.router.navigate(['/admin/login']);
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  navigateToAdmin(): void {
    this.router.navigate(['/admin']);
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.isMobileMenuOpen = false;
  }
}
