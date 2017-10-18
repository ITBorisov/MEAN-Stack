import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  url = 'http://localhost:3001';

  constructor(private http: Http) { }

  registerUser(user) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.url + '/user/register', body, {headers: headers})
                .map((response: Response) => response.json());
  }
}
