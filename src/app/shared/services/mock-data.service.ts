import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Product, CategoryNode, PagedResult, AuthTokens } from '../../contracts';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  
  private mockProducts: Product[] = [
    {
      id: 1,
      sku: 'LAPTOP-001',
      name: 'Laptop Gaming Pro',
      description: 'Laptop de alto rendimiento para gaming y trabajo profesional. Procesador Intel i7, 16GB RAM, RTX 3070.',
      price: 1299.99,
      categoryId: 1,
      isActive: true,
      createdAt: '2024-01-15T10:00:00Z',
      images: [
        { id: 1, url: 'https://p3-ofp.static.pub/fes/cms/2023/03/06/ffbeevxj0xpbedc7x2tvr8qblpd7bd631388.png', altText: 'Laptop Gaming Pro', sortOrder: 1 },
        { id: 2, url: 'https://exitocol.vtexassets.com/arquivos/ids/28733202/Computador-Gaming-LENOVO-Legion-Pro-5-Intel-Core-i9-13900HX-RAM-16-GB-1-TB-SSD-3515365_a.jpg?v=638851656886100000', altText: 'Laptop Gaming Pro Vista 2', sortOrder: 2 }
      ]
    },
    {
      id: 2,
      sku: 'PHONE-002',
      name: 'Smartphone Ultra',
      description: 'Smartphone de última generación con cámara de 108MP y pantalla AMOLED de 6.7 pulgadas.',
      price: 899.99,
      categoryId: 2,
      isActive: true,
      createdAt: '2024-01-20T14:30:00Z',
      images: [
        { id: 3, url: 'https://images.samsung.com/co/smartphones/galaxy-s24-ultra/images/galaxy-s24-ultra-highlights-color-titanium-gray-back-mo.jpg?imbypass=true', altText: 'Smartphone Ultra', sortOrder: 1 }
      ]
    },
    {
      id: 3,
      sku: 'TABLET-003',
      name: 'Tablet Pro 12"',
      description: 'Tablet profesional con pantalla de 12 pulgadas, ideal para diseño y productividad.',
      price: 699.99,
      categoryId: 2,
      isActive: false,
      createdAt: '2024-01-25T09:15:00Z',
      images: [
        { id: 4, url: 'https://mac-center.com/cdn/shop/files/iPad_Pro_Wi-Fi_12-9_in_6th_generation_Space_Gray_PDP_Image_Position-1a__MXLA_85ca95b0-b538-45c0-9d0c-599a5cdf6292.jpg?v=1700284319&width=823', altText: 'Tablet Pro', sortOrder: 1 },
        { id: 5, url: 'https://mac-center.com/cdn/shop/files/iPad_Pro_Wi-Fi_12-9_in_6th_generation_Space_Gray_PDP_Image_Position-1b__MXLA_9c4c4b87-b78d-4691-9aa1-d60d8e1de329.jpg?v=1700284321', altText: 'Tablet Pro Vista 2', sortOrder: 2 },
        { id: 6, url: 'https://mac-center.com/cdn/shop/files/iPad_Pro_Wi-Fi_12-9_in_6th_generation_Space_Gray_PDP_Image_Position-3__MXLA_7e2511d2-032a-406f-9960-6ee7dc937e1a.jpg?v=1700284325', altText: 'Tablet Pro Vista 3', sortOrder: 3 }
      ]
    },
    {
      id: 4,
      sku: 'MOUSE-004',
      name: 'Mouse Gaming RGB',
      description: 'Mouse gaming con iluminación RGB, 12000 DPI y 8 botones programables.',
      price: 79.99,
      categoryId: 3,
      isActive: true,
      createdAt: '2024-02-01T16:45:00Z',
      images: [
        { id: 7, url: 'data:image/jpeg;base64,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', altText: 'Mouse Gaming RGB', sortOrder: 1 }
      ]
    },
    {
      id: 5,
      sku: 'KEYBOARD-005',
      name: 'Teclado Mecánico',
      description: 'Teclado mecánico con switches Cherry MX Blue, retroiluminación y layout en español.',
      price: 129.99,
      categoryId: 3,
      isActive: true,
      createdAt: '2024-02-05T11:20:00Z',
      images: [
        { id: 8, url: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcR8eDBYogT2szibICloya7ZH1dXpvMldMH15G7HM8ktHUDoL8PPep0nekWcKperTO7dCVcAjJxRjIQ-bZ4-TzerNH-wF4jOtANGA_owI2LdPWmPi3KM9u3qgA', altText: 'Teclado Mecánico', sortOrder: 1 }
      ]
    }
  ];

  private mockCategories: CategoryNode[] = [
    {
      id: 1,
      name: 'Computadoras',
      isActive: true,
      children: [
        { id: 4, name: 'Laptops', isActive: true },
        { id: 5, name: 'Desktops', isActive: true }
      ]
    },
    {
      id: 2,
      name: 'Dispositivos Móviles',
      isActive: true,
      children: [
        { id: 6, name: 'Smartphones', isActive: true },
        { id: 7, name: 'Tablets', isActive: true }
      ]
    },
    {
      id: 3,
      name: 'Accesorios',
      isActive: true,
      children: [
        { id: 8, name: 'Teclados', isActive: true },
        { id: 9, name: 'Ratones', isActive: true },
        { id: 10, name: 'Auriculares', isActive: false }
      ]
    }
  ];

  // Simular productos destacados para Home
  getFeaturedProducts(): Observable<Product[]> {
    const featured = this.mockProducts.filter(p => p.isActive).slice(0, 4);
    return of(featured).pipe(delay(500));
  }

  // Simular lista paginada con filtros
  getProducts(page: number = 1, pageSize: number = 12, filters?: any): Observable<PagedResult<Product>> {
    let filteredProducts = [...this.mockProducts];
    
    // Aplicar filtros
    if (filters) {
      if (filters.search) {
        filteredProducts = filteredProducts.filter(p => 
          p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          p.description?.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
      if (filters.categoryId) {
        filteredProducts = filteredProducts.filter(p => p.categoryId === filters.categoryId);
      }
      if (filters.minPrice) {
        filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice);
      }
      if (filters.maxPrice) {
        filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice);
      }
    }

    // Aplicar ordenamiento
    if (filters?.sortBy) {
      filteredProducts.sort((a, b) => {
        const direction = filters.sortDirection === 'desc' ? -1 : 1;
        switch (filters.sortBy) {
          case 'name':
            return a.name.localeCompare(b.name) * direction;
          case 'price':
            return (a.price - b.price) * direction;
          case 'createdAt':
            return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * direction;
          default:
            return 0;
        }
      });
    }

    // Paginación
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    const result: PagedResult<Product> = {
      items: paginatedProducts,
      page,
      pageSize,
      total: filteredProducts.length
    };

    return of(result).pipe(delay(800));
  }

  // Simular obtener producto por ID
  getProductById(id: number): Observable<Product | null> {
    const product = this.mockProducts.find(p => p.id === id) || null;
    return of(product).pipe(delay(600));
  }

  // Simular categorías públicas
  getPublicCategories(): Observable<CategoryNode[]> {
    const activeCategories = this.mockCategories.filter(c => c.isActive);
    return of(activeCategories).pipe(delay(400));
  }

  // Simular categorías admin
  getAdminCategories(): Observable<CategoryNode[]> {
    return of(this.mockCategories).pipe(delay(400));
  }

  // Simular login
  login(email: string, password: string): Observable<AuthTokens> {
    // Simular validación básica
    if (email === 'admin@catalogo.com' && password === 'admin123') {
      const tokens: AuthTokens = {
        accessToken: 'mock-jwt-token-' + Date.now(),
        expiresIn: 3600
      };
      return of(tokens).pipe(delay(1000));
    } else {
      throw new Error('Credenciales inválidas');
    }
  }

  // Simular crear/actualizar producto
  saveProduct(product: Partial<Product>): Observable<Product> {
    const newProduct: Product = {
      id: product.id || this.mockProducts.length + 1,
      sku: product.sku || '',
      name: product.name || '',
      description: product.description,
      price: product.price || 0,
      categoryId: product.categoryId,
      isActive: product.isActive ?? true,
      createdAt: product.createdAt || new Date().toISOString(),
      images: product.images || []
    };

    if (product.id) {
      // Actualizar existente
      const index = this.mockProducts.findIndex(p => p.id === product.id);
      if (index >= 0) {
        this.mockProducts[index] = newProduct;
      }
    } else {
      // Crear nuevo
      this.mockProducts.push(newProduct);
    }

    return of(newProduct).pipe(delay(800));
  }

  // Simular toggle producto
  toggleProduct(id: number): Observable<Product> {
    const product = this.mockProducts.find(p => p.id === id);
    if (product) {
      product.isActive = !product.isActive;
      return of(product).pipe(delay(500));
    }
    throw new Error('Producto no encontrado');
  }
}
