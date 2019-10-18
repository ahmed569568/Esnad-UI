import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpEventType
} from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { timeout, catchError, tap } from 'rxjs/operators';
import { LoadingService } from '@app/shared/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loading: LoadingService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loading.show();
    return next.handle(request).pipe(
      timeout(10000),
      tap((e: HttpEvent<any>) => {
        if (e.type === HttpEventType.UploadProgress) {
        } else if (e instanceof HttpResponse) {
          return this.loading.hide();
        }
      }),
      catchError(e => {
        this.loading.hide();
        return observableThrowError(e);
      })
    );
  }
}
