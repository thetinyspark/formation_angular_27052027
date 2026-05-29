import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { of } from 'rxjs';

export const cartInterceptor: HttpInterceptorFn = (req, next) => {
    if( req.url == environment.cartApiUrl){
      if( req.method == "GET" ){
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        return of(
          new HttpResponse({
            status: 200, 
            body: cart
          })
        );
      }

      if( req.method == "POST" ){
        localStorage.setItem("cart", req.body as string);
        return of(
          new HttpResponse({
            status: 200, 
            body: ""
          })
        );
      }
    }
  
    return next(req);
};
