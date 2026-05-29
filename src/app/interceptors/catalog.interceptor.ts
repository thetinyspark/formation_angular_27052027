import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { of } from 'rxjs';
import { CATALOG } from '../mocks/product.mocks';

export const catalogInterceptor: HttpInterceptorFn = (req, next) => {
  
  if( req.method == "GET" && req.url == environment.productApiUrl){
    return of(
      new HttpResponse({
        status: 200, 
        body: CATALOG
      })
    );
  }

  return next(req);
};
