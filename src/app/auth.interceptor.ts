import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const auth = inject(AuthService);
  const token = auth.token
  const logged = auth.login()

  if (!logged) { 
    return next(req)
  }

  const headers = new HttpHeaders({
    Authorization: String(token)
  })

  const newReq = req.clone({
    headers
  })

  return next(newReq)
}