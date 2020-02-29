import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }
  public getGuests() :Observable<Object> {
    return this.httpClient.get<Object>(API_URL + '/guests');
   }
   public getOrders() :Observable<Object> {
    return this.httpClient.get<Object>(API_URL + '/orders');
   }

   public getOrderFiles(id) :Observable<Blob> {
    return this.httpClient.get<Blob>(API_URL + '/orders/' + id + '/files', {
      responseType: 'blob' as 'json'
    });
   }
}