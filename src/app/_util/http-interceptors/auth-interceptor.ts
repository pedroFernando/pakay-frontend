import { Observable } from 'rxjs';
import { TOKEN_NAME } from './../var.constant';
import { Injectable } from '@angular/core';

import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Get the auth token from the service.
        // Clone the request and replace the original headers with
        // cloned headers, updated with the authorization.
        if (req.url.includes('/auth/authenticate') || req.url.includes('https://api.ipify.org/?format=json')) {
            return next.handle(req);
        }
        const authReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${JSON.parse(sessionStorage.getItem(TOKEN_NAME))}`)
                .set('Content-Type', 'application/json')
        });
        // send cloned request with header to the next handler.
        return next.handle(authReq);
    }
}