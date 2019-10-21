import { Injectable } from '@angular/core';
import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';

/**
 * Prefixes all requests not starting with `http[s]` with `environment.serverUrl`.
 */
@Injectable({
	providedIn: 'root'
})
export class ApiPrefixInterceptor implements HttpInterceptor {
	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		if (!/^(http|https):/i.test(request.url)) {
			if (request.url.split('/')[0] === 'assets') {
				request = request.clone({ url: request.url });
			} else {
				request = request.clone({ url: environment.serverUrl + request.url });
				request = request.clone({
					headers: request.headers
						.set('client_id', '2')
						.set('user_id', '1')
						.set('lang', 'ar')
				});
			}
		}
		return next.handle(request);
	}
}
