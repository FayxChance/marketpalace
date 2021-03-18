import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private readonly URL = 'https://marketpalace.azurewebsites.net/request/';
  private readonly URL_LOCAL = 'http://localhost:3000/request/';

  constructor(private http: HttpClient) {}

  public get(options?: any): Observable<{ deliveryCost: number }> {
    const params = {
      params: new HttpParams({
        fromString:
          'weight=' + options['weight'] + '&dist=' + options['distance'],
      }),
      responseType: 'json' as const,
    };
    return this.http.get<{ deliveryCost: number }>(this.URL, params);
  }
}
