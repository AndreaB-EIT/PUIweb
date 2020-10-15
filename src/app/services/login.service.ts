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

  // private message: string;
  
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
        // this.logged = true;
        this.emitLogin(true);
      }), catchError(err => {
        // WIP
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
        // alert(err.message);
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
    // this.logged = false;
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.user = null;
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
