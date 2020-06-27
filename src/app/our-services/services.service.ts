import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = environment.apiURL;
// const httpOptions = {
//     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

 
  constructor(private httpClient: HttpClient) { }
  noAuthHeader = { headers: new HttpHeaders({ "noauth": "true" }) };


  public createService(data) :Observable<Object> {
    return this.httpClient.post<Object>(API_URL + '/orders', data, this.noAuthHeader);
   }
}
