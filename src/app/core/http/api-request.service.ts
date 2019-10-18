import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '@app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {
  constructor(private http: HttpClient) {}

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
}
