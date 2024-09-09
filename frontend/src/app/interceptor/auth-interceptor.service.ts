import { Injectable } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("interceptor calleddddd");
    if (req.method === 'OPTIONS') {
      return next.handle(req);
    }
  

    // Define the URLs where Authorization header is NOT needed (e.g., login and register)
    const excludedUrls = ['/login', '/register'];

    // Check if the current request URL matches any of the excluded URLs
    const isExcluded = excludedUrls.some(url => req.url.includes(url));

    // If it's an excluded URL, don't modify the request, just pass it along
    if (isExcluded) {
      console.log('exluded yeah okay');
      return next.handle(req);
    }
    

    const token = this.authService.getToken();  // Retrieve token from localStorage

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(cloned);
    }
    
    return next.handle(req);
  }
}
