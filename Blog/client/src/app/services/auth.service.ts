import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';



@Injectable()
export class AuthService {
  url = 'http://localhost:3001';
  authToken;
  user;
  constructor(private http: Http) { }

  registerUser(user) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.url + '/user/register', body, {headers: headers})
                .map((response: Response) => response.json());
  }

  loginUser(user) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.url + '/user/login', body, {headers: headers})
                .map((response: Response) => response.json());
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  loggedIn() {
    return tokenNotExpired();
  }

  userData(user, token) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token );

    this.user = user;
    this.authToken = token;
  }


  getProfile() {
    this.loadToken();
    const headers = new Headers({'Content-Type': 'application/json', 'authorization': this.authToken});
    return this.http.get(this.url + '/user/profile', {headers: headers})
                .map((response: Response) => response.json());
  }

  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }
}
