import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Manejar ProblemDetails y convertir a toasts
      if (error.error && error.error.title) {
        // ProblemDetails format
        console.error('Error:', error.error.title, error.error.detail);
        // TODO: Integrar con servicio de toasts
      } else {
        console.error('HTTP Error:', error.message);
      }
      
      return throwError(() => error);
    })
  );
};
