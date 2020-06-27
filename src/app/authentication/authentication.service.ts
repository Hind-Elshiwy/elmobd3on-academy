import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
// authentication service is used to LOGIN and LOGOUT of the application
// it posts the creds (username and password) to the backend and check for the response if it has JWT token
// if the response from the backend has jwt token, then the authentication was succesful
// on successful authentication, the user details are stored in the local storage + jwt token


const API_URL = environment.apiURL;
@Injectable({providedIn: 'root'})
export class AuthenticationService {
    constructor(private HttpClient: HttpClient, private router: Router){}
    noAuthHeader = { headers: new HttpHeaders({ "noauth": "true", "noguard": "true" }) };
    // login
    public login(email, password):Observable<Object>{
        return this.HttpClient.post<any>(API_URL +'/admins/signin', {email,password}, this.noAuthHeader);
    }
       
    // logout
    logout(){
        // remove user from local storage
        localStorage.removeItem('currentUser');
        this.router.navigate(['/admin/login']);

    }

    // helpers
    setToken(token: string) {
        localStorage.setItem('currentUser', token);
    }

    getToken() {
        return localStorage.getItem('currentUser');
    }


    getUserPayload() {
        let token = this.getToken();
        if (token) {
          let userPayload = atob(token.split('.')[1]);
          return JSON.parse(userPayload);
        }
        else
          return null;
      }
}
