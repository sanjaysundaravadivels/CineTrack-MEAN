import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CompletedlistService {
  alertSuc: boolean = false;
  putRes: any = { success: false };
  constructor(private http: HttpClient, private authService: AuthService) {}
  res: any = { success: false, movieList: [] };
  res1: any = { success: false, movieList: [] };
  token1 = localStorage.getItem('id_token');
  token = this.token1 ? this.token1 : this.authService.tok.token;
  async getCompletedList() {
    const headers = new HttpHeaders().set('x-auth-token', this.token);

    try {
      return await this.http
        .get('http://localhost:8080/movielist', {
          headers: headers,
        })
        .toPromise()
        .then((data) => {
          this.res1 = { ...this.res1, ...data };
        });
    } catch (error) {
      window.location.reload();
    }
  }
  async sendBook(completedList: any) {
    try {
      let headers = new HttpHeaders()

        .set('Content-Type', 'application/json')
        .set('x-auth-token', this.token);

      await this.http
        .post('http://localhost:8080/movielist', completedList, {
          headers: headers,
        })
        .toPromise()
        .then((data) => {
          this.putRes = { ...this.putRes, ...data };
        });
      return new Promise((resolve) => setTimeout(resolve));
    } catch (error) {
      window.location.reload();
    }
  }
}
