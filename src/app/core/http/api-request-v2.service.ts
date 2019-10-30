import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '@app/interfaces';
import { FileSaverService } from 'ngx-filesaver';
import { timeout } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ApiRequestV2Service {
	constructor(
		private http: HttpClient,
		public fileSaverService: FileSaverService
	) {}

	post(prefix: string, params: {} = {}, headers?: {}): Observable<any> {
		const httpOptions = {
			headers
		};
		return this.http.post<ApiResponse>(prefix, params, httpOptions);
	}

	put(prefix: string, params: {} = {}, headers?: {}): Observable<any> {
		const httpOptions = {
			headers
		};
		return this.http.put<ApiResponse>(prefix, params, httpOptions);
	}

	get(prefix: string, headers?: any): Observable<any> {
		let httpOptions = {
			headers
		};
		if (headers) {
			httpOptions = { ...headers, params: headers.queryParams };
		}
		return this.http.get<ApiResponse>(prefix, httpOptions);
	}

	delete(prefix: string, headers?: {}): Observable<any> {
		const httpOptions = {
			headers
		};
		return this.http.delete<ApiResponse>(prefix, httpOptions);
	}

	/**
	 * custom request method to handle custom api requests like delete with a body
	 * @param method ex delete
	 * @param url ex users
	 * @param body ex {ids: [5,6,7]}
	 * @param headers request headers optional
	 * @param params additional params
	 * @param responseType change response type
	 */

	request(
		method: string,
		url: string,
		body: {} = {},
		headers?: any,
		params?: any,
		responseType?: any
	): Observable<any> {
		return this.http.request(method, url, {
			body,
			headers,
			params,
			responseType
		});
	}

	// .pipe(timeout(30000));
}
