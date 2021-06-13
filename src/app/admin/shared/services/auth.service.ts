import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../../../shared/model/user.model';
import {Observable} from 'rxjs';

@Injectable()
export class AuthService {
  private prefix = 'http://localhost:44305/api/user';
  get token(): string {
    return '';
  }
  constructor(private http: HttpClient) {}
  public login(user: UserModel): Observable<any> {
    return this.http.get(`https://localhost:44353/api/users`);
  }
  public logout() {

  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken() {

  }
}
