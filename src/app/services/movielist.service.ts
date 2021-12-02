import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MovielistService {
  alertSuc: boolean = false;
  putRes: any = { success: false };
  constructor(private http: HttpClient, private authService: AuthService) {}
  res: any = { success: false, movieList: [] };
  res1: any = { success: false, movieList: [] };
  token1 = localStorage.getItem('id_token');
  token = this.token1 ? this.token1 : this.authService.tok.token;
  async getWatchList() {
    this.token = this.token1 ? this.token1 : this.authService.tok.token;
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
      console.log(error);
    }
  }

  async deleteMovie(id: any) {
    this.token = this.token1 ? this.token1 : this.authService.tok.token;
    id = id + '-movie';
    const headers = new HttpHeaders().set('x-auth-token', this.token);

    try {
      return await this.http
        .delete('http://localhost:8080/movielist/' + id, {
          headers: headers,
        })
        .toPromise()
        .then((data) => {});
    } catch (error) {
      console.log(error);
    }
  }
  async deleteTv(id: any) {
    this.token = this.token1 ? this.token1 : this.authService.tok.token;
    const headers = new HttpHeaders().set('x-auth-token', this.token);
    id = id + '-tv';
    try {
      return await this.http
        .delete('http://localhost:8080/movielist/' + id, {
          headers: headers,
        })
        .toPromise()
        .then((data) => {});
    } catch (error) {
      console.log(error);
    }
  }

  async sendMovie(watchList: any) {
    this.token = this.token1 ? this.token1 : this.authService.tok.token;
    try {
      let headers = new HttpHeaders()

        .set('Content-Type', 'application/json')
        .set('x-auth-token', this.token);

      await this.http
        .post('http://localhost:8080/movielist', watchList, {
          headers: headers,
        })
        .toPromise()
        .then((data) => {
          this.putRes = { ...this.putRes, ...data };
        });
      return new Promise((resolve) => setTimeout(resolve, 100));
    } catch (error) {
      console.log(error);
    }
  }
}
