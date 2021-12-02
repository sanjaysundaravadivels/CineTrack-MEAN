import { Injectable } from '@angular/core';
import { SocialAuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ACTION_LOGOUT, ACTION_LOGIN } from '../store/actions/appActions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: SocialUser = new SocialUser();
  authToken: any;
  suc: any = { success: false, email: '' };
  isDev: boolean;
  islogin: boolean = false;
  tok: any = { token: '' };
  data1: any;
  constructor(
    private authService: SocialAuthService,
    private http: HttpClient,
    private store: Store<any>
  ) {
    this.isDev = true; // Change to false before deployment
  }
  ngOnInit() {}
  async loadToken() {
    const token = localStorage.getItem('id_token');
    let headers = new HttpHeaders();
    headers.append(
      'Access-Control-Allow-Origin',
      'http://localhost:8080/tokauth'
    );
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Accept', 'application/json');

    this.data1 = this.http
      .post(
        'http://localhost:8080/tokauth',
        { token: token },
        {
          headers: headers,
        }
      )
      .toPromise()
      .then((data) => {
        this.store.dispatch(ACTION_LOGIN({ user: data }));
        let em = localStorage.getItem('user_email');

        this.suc = { ...this.suc, ...data };
        this.islogin = true;

        if (!this.suc.success || em != this.suc.email) {
          this.signOut();
        }
      })
      .catch((error) => {
        console.warn('from component:', error);
        this.signOut();
      });
  }
  public signIn = async () => {
    try {
      await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    } catch (error) {
      return;
    }
    this.authService.authState.subscribe((user) => {
      if (user == null) {
        return;
      }
      this.user = user;
      this.tok.token = user.idToken;
    });
    this.sendLogin();
  };
  public async sendLogin() {
    let headers = new HttpHeaders();
    headers.append(
      'Access-Control-Allow-Origin',
      'http://localhost:8080/login'
    );
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    try {
      this.http
        .post('http://localhost:8080/login', this.tok, {
          headers: headers,
        })
        .subscribe((data) => {
          this.store.dispatch(ACTION_LOGIN({ user: data }));
          this.islogin = true;
          localStorage.setItem('id_token', this.tok.token);
        });
    } catch (error) {
      window.location.reload();
    }
  }
  public signOut(): void {
    this.authService.signOut();
    this.store.dispatch(ACTION_LOGOUT());
    localStorage.clear();
    this.islogin = false;
    window.location.reload();
  }
  public getState() {
    return this.store.select('appReducer');
  }
}
