import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
// authentication service is used to LOGIN and LOGOUT of the application
// it posts the creds (username and password) to the backend and check for the response if it has JWT token
// if the response from the backend has jwt token, then the authentication was succesful
// on successful authentication, the user details are stored in the local storage + jwt token


const API_URL = environment.apiURL;
@Injectable({providedIn: 'root'})
export class AuthenticationService {
    constructor(private HttpClient: HttpClient){}

    // login
    public login(email, password):Observable<Object>{
        return this.HttpClient.post<any>(API_URL +'/admins/signin', {email,password});
    }
       
    // logout
    logout(){
        // remove user from local storage
        localStorage.removeItem('currentUser');
    }
}
