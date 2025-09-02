# Guía para Cambiar entre Backend y Mock Services

Este documento explica cómo cambiar fácilmente entre el backend real y los servicios mock en la aplicación.

## Estado Actual
- **ACTIVO**: Backend API (https://localhost:5246/api/v1)
- **COMENTADO**: MockDataService (preservado para desarrollo/testing)

## Cómo Cambiar a Mock Services

### 1. Componentes del Catálogo

#### HomeComponent (`src/app/catalog/pages/home/home.component.ts`)
```typescript
// Descomentar import
import { MockDataService } from '../../../shared/services/mock-data.service';

// Agregar al constructor
constructor(
  private productsService: ProductsService,
  private mockDataService: MockDataService // <- Descomentar
) {}

// En loadFeaturedProducts(), cambiar:
// Comentar backend
// this.productsService.getFeatured().subscribe({

// Descomentar mock
this.mockDataService.getFeaturedProducts().subscribe({
```

#### ListComponent (`src/app/catalog/pages/list/list.component.ts`)
```typescript
// Descomentar import
import { MockDataService } from '../../../shared/services/mock-data.service';

// Agregar al constructor
private mockDataService: MockDataService, // <- Descomentar

// En loadCategories(), cambiar:
// this.categoriesService.listPublic().subscribe({ // <- Comentar
this.mockDataService.getPublicCategories().subscribe({ // <- Descomentar

// En loadProducts(), cambiar:
// this.productsService.getPublicList(...).subscribe({ // <- Comentar
this.mockDataService.getProducts(...).subscribe({ // <- Descomentar
```

#### DetailComponent (`src/app/catalog/pages/detail/detail.component.ts`)
```typescript
// Descomentar import
import { MockDataService } from '../../../shared/services/mock-data.service';

// Agregar al constructor
private mockDataService: MockDataService // <- Descomentar

// En loadProduct(), cambiar:
// this.productsService.getPublicById(id).subscribe({ // <- Comentar
this.mockDataService.getProductById(id).subscribe({ // <- Descomentar
```

### 2. Componentes de Admin

#### LoginComponent (`src/app/admin/pages/login/login.component.ts`)
```typescript
// Descomentar import
import { MockDataService } from '../../../shared/services/mock-data.service';

// Agregar al constructor
private mockDataService: MockDataService // <- Descomentar

// En onSubmit(), cambiar:
// this.authService.login(email, password).subscribe({ // <- Comentar
this.mockDataService.login(email, password).subscribe({ // <- Descomentar
```

#### ProductsComponent (`src/app/admin/pages/products/products.component.ts`)
```typescript
// Descomentar import
import { MockDataService } from '../../../shared/services/mock-data.service';

// Agregar al constructor
private mockDataService: MockDataService, // <- Descomentar

// En loadProducts(), cambiar:
// this.productsService.list(...).subscribe({ // <- Comentar
this.mockDataService.getProducts(...).subscribe({ // <- Descomentar

// En onToggleProduct(), cambiar:
// this.productsService.toggle(product.id).subscribe({ // <- Comentar
this.mockDataService.toggleProduct(product.id).subscribe({ // <- Descomentar
```

#### CategoriesComponent (`src/app/admin/pages/categories/categories.component.ts`)
```typescript
// Descomentar import
import { MockDataService } from '../../../shared/services/mock-data.service';

// Agregar al constructor
private mockDataService: MockDataService // <- Descomentar

// En loadCategories(), cambiar:
// this.categoriesService.getAdminCategories().subscribe({ // <- Comentar
this.mockDataService.getAdminCategories().subscribe({ // <- Descomentar

// Para operaciones CRUD, usar la lógica comentada en cada método
```

#### ProductFormComponent (`src/app/admin/pages/product-form/product-form.component.ts`)
```typescript
// Descomentar import
import { MockDataService } from '../../../shared/services/mock-data.service';

// Agregar al constructor
private mockDataService: MockDataService // <- Descomentar

// En loadCategories(), cambiar:
// this.categoriesService.getAdminCategories().subscribe({ // <- Comentar
this.mockDataService.getAdminCategories().subscribe({ // <- Descomentar

// En loadProduct(), cambiar:
// this.productsService.get(id).subscribe({ // <- Comentar
this.mockDataService.getProductById(id).subscribe({ // <- Descomentar

// En onSaveProduct(), cambiar:
// const saveObservable = ... // <- Comentar todo el bloque backend
this.mockDataService.saveProduct(productToSave).subscribe({ // <- Descomentar
```

## Notas Importantes

1. **MockDataService**: Está completamente preservado con todos los datos de prueba
2. **Credenciales Mock**: `admin@catalogo.com` / `admin123`
3. **Datos de Prueba**: 10 productos, 3 categorías principales con subcategorías
4. **Funcionalidades Mock**: Paginación, filtros, búsqueda, CRUD completo

## Cambio Rápido

Para cambiar rápidamente entre servicios, puedes usar Find & Replace en tu IDE:

**Para cambiar a Mock:**
- Buscar: `// this.mockDataService`
- Reemplazar: `this.mockDataService`
- Buscar: `this.productsService.getFeatured()`
- Reemplazar: `// this.productsService.getFeatured()`

**Para volver a Backend:**
- Hacer el proceso inverso

## Verificación

Después de cambiar a mock services:
1. La aplicación debe funcionar sin conexión al backend
2. Los datos de prueba deben aparecer correctamente
3. Todas las operaciones CRUD deben funcionar en memoria
4. El login debe aceptar las credenciales mock
