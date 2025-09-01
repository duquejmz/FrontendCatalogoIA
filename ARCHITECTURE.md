# Arquitectura Frontend - Catálogo IA

## 📁 Estructura de Carpetas Completa

```
src/app/
├── core/                                    # Módulo principal (singleton services, guards, interceptors)
│   ├── guards/
│   │   ├── auth.guard.ts                   # CanActivateFn - Protege rutas admin
│   │   └── no-auth.guard.ts                # CanActivateFn - Redirige si ya está autenticado
│   ├── interceptors/
│   │   ├── auth.interceptor.ts             # HttpInterceptorFn - Bearer token a /api/v1/admin/*
│   │   └── error.interceptor.ts            # HttpInterceptorFn - ProblemDetails → toasts
│   ├── services/
│   │   ├── auth.service.ts                 # Autenticación y manejo de tokens
│   │   ├── products.service.ts             # CRUD productos (admin)
│   │   └── categories.service.ts           # CRUD categorías (admin + public)
│   └── core.module.ts                      # Módulo core con singleton pattern
├── shared/                                  # Componentes reutilizables
│   ├── components/
│   │   ├── product-grid/                   # Grid responsive 2-4 columnas
│   │   │   ├── product-grid.component.ts
│   │   │   ├── product-grid.component.html
│   │   │   └── product-grid.component.scss
│   │   ├── product-filters/                # Filtros y ordenamiento
│   │   │   ├── product-filters.component.ts
│   │   │   ├── product-filters.component.html
│   │   │   └── product-filters.component.scss
│   │   └── product-detail/                 # Detalle con galería de imágenes
│   │       ├── product-detail.component.ts
│   │       ├── product-detail.component.html
│   │       └── product-detail.component.scss
│   └── shared.module.ts                    # Módulo compartido
├── catalog/                                 # Módulo público
│   ├── pages/
│   │   ├── home/                           # Página principal del catálogo
│   │   │   ├── home.component.ts
│   │   │   ├── home.component.html
│   │   │   └── home.component.scss
│   │   ├── list/                           # Lista de productos con filtros
│   │   │   ├── list.component.ts
│   │   │   ├── list.component.html
│   │   │   └── list.component.scss
│   │   └── detail/                         # Detalle de producto
│   │       ├── detail.component.ts
│   │       ├── detail.component.html
│   │       └── detail.component.scss
│   ├── services/
│   │   └── catalog.service.ts              # Servicios públicos con filtros/paginación
│   ├── catalog-routing.module.ts           # Routing del catálogo
│   └── catalog.module.ts                   # Módulo del catálogo
├── admin/                                   # Módulo privado
│   ├── pages/
│   │   ├── login/                          # Autenticación
│   │   │   ├── login.component.ts
│   │   │   ├── login.component.html
│   │   │   └── login.component.scss
│   │   ├── products/                       # Lista productos admin
│   │   │   ├── products.component.ts
│   │   │   ├── products.component.html
│   │   │   └── products.component.scss
│   │   ├── product-form/                   # Formulario productos
│   │   │   ├── product-form.component.ts
│   │   │   ├── product-form.component.html
│   │   │   └── product-form.component.scss
│   │   └── categories/                     # Gestión categorías
│   │       ├── categories.component.ts
│   │       ├── categories.component.html
│   │       └── categories.component.scss
│   ├── components/
│   │   ├── admin-product-list/             # Lista de productos admin
│   │   │   ├── admin-product-list.component.ts
│   │   │   ├── admin-product-list.component.html
│   │   │   └── admin-product-list.component.scss
│   │   ├── admin-product-form/             # Formulario reactivo con validaciones
│   │   │   ├── admin-product-form.component.ts
│   │   │   ├── admin-product-form.component.html
│   │   │   └── admin-product-form.component.scss
│   │   └── admin-category-tree/            # Árbol jerárquico de categorías
│   │       ├── admin-category-tree.component.ts
│   │       ├── admin-category-tree.component.html
│   │       └── admin-category-tree.component.scss
│   ├── admin-routing.module.ts             # Routing del admin
│   └── admin.module.ts                     # Módulo del admin
├── contracts/                               # Interfaces TypeScript
│   ├── product.interface.ts                # Product, ProductImage
│   ├── category.interface.ts               # CategoryNode
│   ├── common.interface.ts                 # PagedResult, AuthTokens
│   └── index.ts                            # Exportaciones centralizadas
├── app.routes.ts                           # Routing principal con lazy loading
├── app.config.ts                           # Configuración de providers e interceptors
└── app.component.ts                        # Componente raíz
```

## 🔧 Arquitectura Clean Code Implementada

### Principios Aplicados:
- **Separación de responsabilidades**: Cada módulo tiene una función específica
- **Componentes standalone**: Arquitectura moderna de Angular 20
- **Lazy loading**: Módulos se cargan bajo demanda para optimizar performance
- **Inyección de dependencias**: Servicios singleton en core
- **Contratos bien definidos**: Interfaces TypeScript centralizadas
- **Guards funcionales**: CanActivateFn para protección de rutas
- **Interceptors funcionales**: HttpInterceptorFn para manejo de requests

### Routing Implementado:
- **Público**: `/`, `/catalog`, `/catalog/products`, `/catalog/products/:id`
- **Privado**: `/admin/login`, `/admin/products`, `/admin/products/new`, `/admin/products/:id`, `/admin/categories`
- **Guards**: AuthGuard protege rutas admin, NoAuthGuard evita acceso a login si ya está autenticado

### Servicios Implementados:
- **AuthService**: Login, logout, manejo de tokens JWT
- **ProductsService**: CRUD completo + manejo de imágenes
- **CategoriesService**: Admin + endpoints públicos
- **CatalogService**: Filtros, ordenamiento y paginación para catálogo público

## 🎯 Componentes Creados

### Compartidos (Shared):
- **ProductGridComponent**: Grid responsive 2-4 columnas
- **ProductFiltersComponent**: Filtros avanzados con formularios reactivos
- **ProductDetailComponent**: Galería de imágenes con thumbnails

### Admin:
- **AdminProductListComponent**: Tabla con acciones CRUD
- **AdminProductFormComponent**: Formulario reactivo con validaciones
- **AdminCategoryTreeComponent**: Árbol jerárquico expandible

## 🔗 Endpoints del Backend (Para implementar)

### Públicos:
- `GET /api/v1/catalog/products` - Lista paginada con filtros
- `GET /api/v1/catalog/products/:id` - Detalle de producto
- `GET /api/v1/categories` - Lista pública de categorías

### Admin (requieren Bearer token):
- `POST /api/v1/auth/login` - Autenticación
- `GET /api/v1/admin/products` - Lista productos admin
- `POST /api/v1/admin/products` - Crear producto
- `PUT /api/v1/admin/products/:id` - Actualizar producto
- `PATCH /api/v1/admin/products/:id/toggle` - Activar/desactivar
- `POST /api/v1/admin/products/:id/images` - Subir imagen
- `DELETE /api/v1/admin/products/:id/images/:imageId` - Eliminar imagen
- `GET /api/v1/admin/categories` - Lista categorías admin
- `POST /api/v1/admin/categories` - Crear categoría
- `PUT /api/v1/admin/categories/:id` - Actualizar categoría
- `DELETE /api/v1/admin/categories/:id` - Eliminar categoría
