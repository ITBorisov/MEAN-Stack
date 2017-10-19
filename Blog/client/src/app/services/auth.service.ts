import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

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

  userData(user, token) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token );

    this.user = user;
    this.authToken = token;
  }
}
