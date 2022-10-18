import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isAuthenticated = new BehaviorSubject('none');
  token = new BehaviorSubject('none');

  userUrl: string = 'http://localhost:8080/api/movies/users/';

  constructor(private Http: HttpClient) {}

  login(user: User): Observable<any> {
    return this.Http.post(this.userUrl + 'login', user);
  }
  infosFromConnectedUser(token: string) {
    const helper = new JwtHelperService();
    return helper.decodeToken(token);
  }

  checkIfIsauthenticated() {
    return this.isAuthenticated;
  }
}
