import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {UserModel} from '../../../shared/model/user.model';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {TokenModel} from '../../../shared/model/token.model';

@Injectable()
export class AuthService {
  private prefix = 'https://localhost:44353/api/users';
  public error$: Subject<string> = new Subject<string>();
  get token(): string {
    const expDate = new Date(localStorage.getItem('fb-token-exp'));
    if (new Date() > expDate){
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token');

  }

  constructor(private http: HttpClient) {
  }

  public login(user: UserModel): Observable<any> {
    // return this.http.get(`${this.prefix}/getUsers`);
    return this.http.post(`${this.prefix}/login`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      );
  }

  public logout() {
    this.setToken(null);
  }

  public isAuthenticated(): boolean {
    debugger
    return !!this.token;
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error;
    switch (message) {
      case 'Http failure response':
        this.error$.next('Ошибка ответа от сервера');
        break;
      case 'Email not found':
        this.error$.next('Email не найде');
        break;
      default:
        this.error$.next('Не обработанная ошибка');
        break;
    }
    console.log(message);
    return throwError(error);
  }

  private setToken(response: TokenModel | null) {
    if(response) {
      //тут возможно ошибка с утсновкой времени
      const expDate = new Date(new Date().getDate() + +response.timeLife * 1000);
      localStorage.setItem('fb-token', response.tokenString);
      localStorage.setItem('fb-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }
}
