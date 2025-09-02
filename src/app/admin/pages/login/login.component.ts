import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { MockDataService } from '../../../shared/services/mock-data.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  error: string | null = null;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
    // private mockDataService: MockDataService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // Pre-fill with demo credentials
    this.loginForm.patchValue({
      email: 'admin@catalogo.com',
      password: 'admin123'
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.error = null;

      const { email, password } = this.loginForm.value;

      // Backend connection (active)
      this.authService.login(email, password).subscribe({
      
      // Mock connection (commented - uncomment to use mock)
      // this.mockDataService.login(email, password).subscribe({
        next: (tokens) => {
          // Store tokens using AuthService
          localStorage.setItem('access_token', tokens.accessToken);
          localStorage.setItem('token_expires', (Date.now() + tokens.expiresIn * 1000).toString());
          
          // Update AuthService state
          this.authService.setAuthenticationState(true);
          
          this.isLoading = false;
          this.router.navigate(['/admin/products']);
        },
        error: (err) => {
          this.error = err.message || 'Credenciales inválidas. Usa: admin@catalogo.com / admin123';
          this.isLoading = false;
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string | null {
    const field = this.loginForm.get(fieldName);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) {
        return `${fieldName === 'email' ? 'Email' : 'Contraseña'} es requerido`;
      }
      if (field.errors['email']) {
        return 'Email inválido';
      }
      if (field.errors['minlength']) {
        return 'La contraseña debe tener al menos 6 caracteres';
      }
    }
    return null;
  }
}
