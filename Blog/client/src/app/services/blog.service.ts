import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BlogService {
  url = this.authService.url;

  constructor(
    private authService: AuthService,
    private http: Http
  ) { }



  newPost(post) {
    this.authService.loadToken();
    const headers = new Headers({'Content-Type': 'application/json', 'authorization': this.authService.authToken});
    return this.http.post(this.url + '/blog/newPost', post, {headers: headers}).map((response: Response) => response.json());
  }
}
