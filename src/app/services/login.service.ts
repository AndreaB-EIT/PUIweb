import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable, of, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private user: User;
  
  private loginUrl = 'http://sanger.dia.fi.upm.es/pui-rest-news/login';
  
  public logged = new Subject<boolean>();

  private httpOptions = {
    headers: new HttpHeaders()
      .set('Content-Type', 'x-www-form-urlencoded')
  };

  constructor(private http: HttpClient) { }

  emitLogin(value) {
    this.logged.next(value);
  }

  isLogged() {
    return this.user != null;
  }

  login(name: string, pwd: string): Observable<User> {
    const usereq = new HttpParams()
      .set('username', name) // us_4_1
      .set('passwd', pwd); // 4414

    return this.http.post<User>(this.loginUrl, usereq).pipe(
      tap(user => {
        this.user = user;
        this.emitLogin(true);
      }), catchError(err => {
        console.log(err.status);
        switch (err.status) {
          case 401: {
            alert('Wrong username or password!');
            break;
          }
          case 404: {
            alert('Not found!');
            break;
          }
          default: {
            alert(err.message);
            break;
          }
        }
        return throwError(err);
      })
    );
  }

  getUser() {
    return this.user;
  }

  logout() {
    this.user = null;
    this.emitLogin(false);
  }

}
