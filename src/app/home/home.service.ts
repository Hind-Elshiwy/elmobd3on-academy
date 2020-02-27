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
export class HomeService {

  constructor(private httpClient: HttpClient) { }


  public create(data) :Observable<Object> {
    return this.httpClient.post<Object>(API_URL + '/guests', data);
   }


}
