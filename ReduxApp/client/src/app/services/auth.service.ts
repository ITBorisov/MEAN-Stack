import { Injectable } from '@angular/core';
import { HttpService } from '../components/core/http.service';
@Injectable()
export class AuthService {

  constructor(private httpService: HttpService) { }

  register(user) {
    return this.httpService.post('auth/signup', user);
  }

}
