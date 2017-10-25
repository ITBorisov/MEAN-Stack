import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {
  baseUrl = 'http://localhost:5000/';
  constructor(private http: Http) { }

  post(url, data) {
    return this.http
    .post(this.baseUrl + url, JSON.stringify(data))
    .map(response => response.json());
  }
}
