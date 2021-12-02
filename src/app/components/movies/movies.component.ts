import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { WatchlistService } from 'src/app/services/watchlist.service';
import { FlashMessagesService } from 'flash-messages-angular';
import { CompletedlistService } from 'src/app/services/completedlist.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  myvar = '';
  myId = '';
  focus: any;
  focus1: any;
  modalOpen: boolean = false;
  isMovie: boolean = true;
  isTv: boolean = false;
  isLatest: boolean = false;
  isTopMovie: boolean = false;
  isTopTv: boolean = false;
  isLoaded: boolean = false;
  closeResult: any;
  myCustomColor: String = 'green';
  myCustomValue: number = 2;
  constructor(
    public movieService: MovieService,
    private modalService: NgbModal,
    public authService: AuthService,
    public watchListService: WatchlistService,
    public completedListService: CompletedlistService,
    private flashMessagesService: FlashMessagesService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}
  onMovie() {
    this.isMovie = true;
    this.isTv = false;
    this.isLatest = false;
    this.isTopMovie = false;
    this.isTopTv = false;
  }
  onTv() {
    this.isMovie = false;
    this.isTv = true;
    this.isLatest = false;
    this.isTopMovie = false;
    this.isTopTv = false;
  }
  async onTopMovie() {
    this.isMovie = false;
    this.isTv = false;
    this.isLatest = false;
    this.isTopMovie = true;
    this.isTopTv = false;
    this.showSpinner();
    let a = this.movieService.getMovies(this.myvar, 'topmovie');
    return new Promise((resolve) => {
      setTimeout(() => resolve((this.isLoaded = true)), 2000);
    });
  }
  async onTopTv() {
    this.isMovie = false;
    this.isTv = false;
    this.isLatest = false;
    this.isTopMovie = false;
    this.isTopTv = true;
    this.showSpinner();
    let a = this.movieService.getMovies(this.myvar, 'toptv');
    return new Promise((resolve) => {
      setTimeout(() => resolve((this.isLoaded = true)), 2000);
    });
  }
  async onLatest() {
    this.isMovie = false;
    this.isTv = false;
    this.isLatest = true;
    this.isTopMovie = false;
    this.isTopTv = false;
    this.showSpinner();
    let a = this.movieService.getMovies(this.myvar, 'latest');
    return new Promise((resolve) => {
      setTimeout(() => resolve((this.isLoaded = true)), 2000);
    });
  }
  ngOnInit(): void {}
  myFun(e: any) {
    this.myvar = e.target.value;
  }
  async onSubMovie(e: any) {
    this.movieService.hasThumb = [];
    this.isLoaded = false;
    e.preventDefault();
    let a = this.movieService.getMovies(this.myvar, 'movie');
    return new Promise((resolve) => {
      setTimeout(() => resolve((this.isLoaded = true)), 2000);
    });
  }
  async onSubTv(e: any) {
    this.movieService.hasThumb = [];
    this.isLoaded = false;
    e.preventDefault();
    let a = this.movieService.getMovies(this.myvar, 'tv');
    return new Promise((resolve) => {
      setTimeout(() => resolve((this.isLoaded = true)), 2000);
    });
  }
  showSpinner() {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 3000);
  }
  openModal(id: any) {
    let res = this.isMovie || this.isTopMovie || this.isLatest ? 'movie' : 'tv';
    if (res == 'movie') {
      this.router.navigate(['singlemovie', id]);
    }
    if (res == 'tv') {
      this.router.navigate(['singletv', id]);
    }
  }
}
