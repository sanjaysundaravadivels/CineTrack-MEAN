import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ISO6391 from 'iso-639-1';
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  movieList: any = {
    results: [],
  };
  singleMovie: any = {};
  similarMovies: any = {};
  similartv: any = {};
  movieCredits: any = {};
  tvCredits: any = {};
  singleTv: any = {};
  hasThumb: boolean[] = [];
  KEY = '1d12dc17a04a259f9d9b6674ca12df1b';
  constructor(private http: HttpClient) {}
  async getMovies(name: any, type: string) {
    let url = '';
    if (type == 'tv') {
      url =
        'https://api.themoviedb.org/3/search/tv?api_key=' +
        this.KEY +
        '&query=' +
        name.replace(' ', '+');
    }
    if (type == 'movie') {
      url =
        'https://api.themoviedb.org/3/search/movie?api_key=' +
        this.KEY +
        '&query=' +
        name.replace(' ', '+');
    }
    if (type == 'toptv') {
      url =
        'https://api.themoviedb.org/3/tv/top_rated?api_key=' +
        this.KEY +
        '&language=en-US&page=1';
    }
    if (type == 'topmovie') {
      url =
        'https://api.themoviedb.org/3/movie/top_rated?api_key=' +
        this.KEY +
        '&language=en-US&page=1';
    }
    if (type == 'latest') {
      url =
        'https://api.themoviedb.org/3/movie/now_playing?api_key=' +
        this.KEY +
        '&language=en-US&page=1';
    }
    return await this.http
      .get(url)
      .toPromise()
      .then((data) => {
        this.movieList = { ...this.movieList, ...data };

        if (this.movieList.results.length > 18) {
          this.movieList.results.pop();
          this.movieList.results.pop();
        }
        for (let i in this.movieList.results) {
          if (!this.movieList.results[i].poster_path) {
            this.hasThumb.push(false);
          } else {
            this.hasThumb.push(true);
          }
          if (type == 'tv') {
            this.movieList.results[i].title = this.movieList.results[i].name;
          }
          if (type == 'toptv') {
            this.movieList.results[i].title = this.movieList.results[i].name;
          }
        }
      });
  }
  async getSingleMovie(id: any) {
    let m = await this.http
      .get(
        'https://api.themoviedb.org/3/movie/' +
          id +
          '/similar?api_key=' +
          this.KEY +
          '&language=en-US'
      )
      .toPromise()
      .then((data) => {
        this.similarMovies = { ...this.similarMovies, ...data };
      });
    let t = await this.http
      .get(
        'https://api.themoviedb.org/3/movie/' +
          id +
          '/credits?api_key=' +
          this.KEY +
          '&language=en-US'
      )
      .toPromise()
      .then((data) => {
        this.movieCredits = { ...this.movieCredits, ...data };
        while (this.movieCredits.cast.length > 9) {
          this.movieCredits.cast.pop();
        }
        while (this.movieCredits.crew.length > 9) {
          this.movieCredits.crew.pop();
        }
      });
    return await this.http
      .get(
        'https://api.themoviedb.org/3/movie/' +
          id +
          '?api_key=' +
          this.KEY +
          '&language=en-US'
      )
      .toPromise()
      .then((data) => {
        this.singleMovie = { ...this.singleMovie, ...data };

        this.singleMovie.original_language = ISO6391.getName(
          this.singleMovie.original_language
        );

        if (!this.singleMovie.backdrop_path) {
          this.singleMovie.backdrop_path =
            'https://lh3.googleusercontent.com/proxy/7-PSAtk8tBZeZfBDskAG0Dne7XPqhKekvL_szypWogg06Y_JM9K1wJutjIMDvjjwbuQxlzTfcBO-0BskIct1mVk';
        } else {
          this.singleMovie.backdrop_path =
            'https://image.tmdb.org/t/p/w500' + this.singleMovie.backdrop_path;
        }
      });
  }
  async getSingleTv(id: any) {
    let m = await this.http
      .get(
        'https://api.themoviedb.org/3/tv/' +
          id +
          '/similar?api_key=' +
          this.KEY +
          '&language=en-US'
      )
      .toPromise()
      .then((data) => {
        this.similartv = { ...this.similartv, ...data };
      });
    let t = await this.http
      .get(
        'https://api.themoviedb.org/3/tv/' +
          id +
          '/credits?api_key=' +
          this.KEY +
          '&language=en-US'
      )
      .toPromise()
      .then((data) => {
        this.tvCredits = { ...this.tvCredits, ...data };
        while (this.tvCredits.cast.length > 9) {
          this.tvCredits.cast.pop();
        }
        while (this.tvCredits.crew.length > 9) {
          this.tvCredits.crew.pop();
        }
      });
    return await this.http
      .get(
        'https://api.themoviedb.org/3/tv/' +
          id +
          '?api_key=' +
          this.KEY +
          '&language=en-US'
      )
      .toPromise()
      .then((data) => {
        this.singleTv = { ...this.singleTv, ...data };

        this.singleTv.original_language = ISO6391.getName(
          this.singleTv.original_language
        );

        if (!this.singleTv.backdrop_path) {
          this.singleTv.backdrop_path =
            'https://lh3.googleusercontent.com/proxy/7-PSAtk8tBZeZfBDskAG0Dne7XPqhKekvL_szypWogg06Y_JM9K1wJutjIMDvjjwbuQxlzTfcBO-0BskIct1mVk';
        } else {
          this.singleTv.backdrop_path =
            'https://image.tmdb.org/t/p/w500' + this.singleTv.backdrop_path;
        }
      });
  }
}
