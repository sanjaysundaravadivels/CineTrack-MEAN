import { Component, OnInit } from '@angular/core';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterModule, Routes } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import * as Aos from 'aos';
import { WatchlistService } from 'src/app/services/watchlist.service';
import { CompletedlistService } from 'src/app/services/completedlist.service';
import { BookService } from 'src/app/services/book.service';
import { FlashMessagesService } from 'flash-messages-angular';
import { MovielistService } from 'src/app/services/movielist.service';
import { MovieService } from 'src/app/services/movie.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: [
    './profile.component.css',
    '../../../../node_modules/animate.css/animate.css',
  ],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('1s ease-out', style({ height: 300, opacity: 1 })),
      ]),
      transition(':leave', [
        style({ height: 300, opacity: 1 }),
        animate('1s ease-in', style({ height: 0, opacity: 0 })),
      ]),
    ]),
  ],
})
export class ProfileComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public watchListService: WatchlistService,
    public completeListService: CompletedlistService,
    private store: Store<any>,
    private router: Router,
    private _renderer2: Renderer2,
    public bookService: BookService,
    private modalService: NgbModal,
    private flashMessagesService: FlashMessagesService,
    public movieListService: MovielistService,
    public movieService: MovieService,
    @Inject(DOCUMENT) private _document: Document
  ) {}
  public name: string = '';
  public email: string = '';
  public picture: string = '';
  public allItem: boolean = true;
  public completed: boolean = false;
  public yet: boolean = false;

  public isBookList: boolean = false;
  public isMovieList: boolean = false;
  public iscompList: boolean = false;
  public type: string = '';
  public singleList: any;

  ngOnInit(): void {
    this.authService.getState().subscribe(async (state) => {
      this.email = state.user.email;
      this.name = state.user.name;
      this.picture = state.user.picture;
    });
  }
  async openVerticallyCentered(
    content: any,
    id: any,
    comp: boolean,
    type: String = 'book'
  ) {
    if (type == 'movie') {
      this.type = 'movie';
      await this.movieService.getSingleMovie(id);
      this.singleList = this.movieService.singleMovie;
    }
    if (type == 'tv') {
      this.type = 'tv';
      await this.movieService.getSingleTv(id);
      this.singleList = this.movieService.singleTv;
    }
    if (type == 'book') {
      let d = await this.bookService.getSingleBook(id);
      try {
        if (this.bookService.singleBook.volumeInfo.imageLinks.thumbnail == '') {
          this.bookService.singleBook.volumeInfo.imageLinks.thumbnail =
            'https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/26345/book-clipart-md.png';
        }
      } catch (error) {
        let imageLinks = {
          thumbnail:
            'https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/26345/book-clipart-md.png',
        };
        this.bookService.singleBook.volumeInfo = {
          ...this.bookService.singleBook.volumeInfo,
          imageLinks,
        };
      }
    }
    this.iscompList = comp;

    this.modalService.open(content, { centered: true });
  }
  async markAscompleted(id: any, title: any, picture: any, authors: any) {
    await this.watchListService.deleteBook(id);
    const watchList = {
      isCompleted: true,
      title: title,
      id: id,
      picture: picture,
      authors: authors,
    };

    // this.watchListService.getWatchList();
    let d = await this.watchListService.sendBook(watchList);

    if (this.watchListService.putRes.success) {
      this.flashMessagesService.show(
        '<i class="ni ni-notification-70"></i>   &nbsp;&nbsp;&nbsp;  <b>Item added to the list Successfully</b>',
        {
          cssClass: 'alert-success',
          timeout: 3000,
        }
      );
    } else {
      this.flashMessagesService.show(
        '<i class="ni ni-notification-70"></i>   &nbsp;&nbsp;&nbsp;  <b>Item already in the list</b>',
        {
          cssClass: 'alert-success',
          timeout: 3000,
        }
      );
    }
    await this.watchListService.getWatchList();
  }
  async markAsyet(id: any, title: any, picture: any, authors: any) {
    await this.watchListService.deleteBook(id);
    const watchList = {
      isCompleted: false,
      title: title,
      id: id,
      picture: picture,
      authors: authors,
    };

    // this.watchListService.getWatchList();
    let d = await this.watchListService.sendBook(watchList);

    if (this.watchListService.putRes.success) {
      this.flashMessagesService.show(
        '<i class="ni ni-notification-70"></i>   &nbsp;&nbsp;&nbsp;  <b>Item added to the list Successfully</b>',
        {
          cssClass: 'alert-success',
          timeout: 3000,
        }
      );
    } else {
      this.flashMessagesService.show(
        '<i class="ni ni-notification-70"></i>   &nbsp;&nbsp;&nbsp;  <b>Item already in the list</b>',
        {
          cssClass: 'alert-success',
          timeout: 3000,
        }
      );
    }
    await this.watchListService.getWatchList();
  }
  async markAscompletedMovie(id: any, title: any, picture: any, ratings: any) {
    if (this.type == 'movie') {
      await this.movieListService.deleteMovie(id);
      const watchList = {
        isCompleted: true,
        type: 'movie',
        title: title,
        id: id,
        picture: picture,
        ratings: ratings,
      };

      // this.watchListService.getWatchList();
      let d = await this.movieListService.sendMovie(watchList);
      await this.movieListService.getWatchList();
    }

    if (this.type == 'tv') {
      await this.movieListService.deleteTv(id);
      const watchList = {
        isCompleted: true,
        type: 'tv',
        title: title,
        id: id,
        picture: picture,
        ratings: ratings,
      };

      // this.watchListService.getWatchList();
      let d = await this.movieListService.sendMovie(watchList);
      await this.movieListService.getWatchList();
    }
    this.flashMessagesService.show(
      '<i class="ni ni-notification-70"></i>   &nbsp;&nbsp;&nbsp;  <b>Item Moved to the list Successfully</b>',
      {
        cssClass: 'alert-success',
        timeout: 3000,
      }
    );
  }
  async markAsyetMovie(id: any, title: any, picture: any, ratings: any) {
    if (this.type == 'movie') {
      await this.movieListService.deleteMovie(id);
      const watchList = {
        isCompleted: false,
        type: 'movie',
        title: title,
        id: id,
        picture: picture,
        ratings: ratings,
      };

      // this.watchListService.getWatchList();
      let d = await this.movieListService.sendMovie(watchList);
      await this.movieListService.getWatchList();
    }

    if (this.type == 'tv') {
      await this.movieListService.deleteTv(id);
      const watchList = {
        isCompleted: false,
        type: 'tv',
        title: title,
        id: id,
        picture: picture,
        ratings: ratings,
      };

      // this.watchListService.getWatchList();
      let d = await this.movieListService.sendMovie(watchList);
      await this.movieListService.getWatchList();
    }
    this.flashMessagesService.show(
      '<i class="ni ni-notification-70"></i>   &nbsp;&nbsp;&nbsp;  <b>Item Moved to the list Successfully</b>',
      {
        cssClass: 'alert-success',
        timeout: 3000,
      }
    );
  }
  async getBookList() {
    await this.watchListService.getWatchList();
    this.isBookList = true;
    this.isMovieList = false;
    this.allItem = true;
    this.completed = false;
    this.yet = false;
  }
  async getMovieList() {
    await this.movieListService.getWatchList();
    this.isBookList = false;
    this.isMovieList = true;
    this.allItem = true;
    this.completed = false;
    this.yet = false;
  }
  async deleteBook(id: any) {
    await this.watchListService.deleteBook(id);
    await this.watchListService.getWatchList();
    this.flashMessagesService.show(
      '<i class="ni ni-notification-70"></i>   &nbsp;&nbsp;&nbsp;  <b>Item removed Successfully</b>',
      {
        cssClass: 'alert-success',
        timeout: 3000,
      }
    );
  }
  async deleteMovie(id: any, type: string = this.type) {
    this.type = type;

    if (this.type == 'movie') {
      await this.movieListService.deleteMovie(id);
      await this.movieListService.getWatchList();
    }
    if (this.type == 'tv') {
      await this.movieListService.deleteTv(id);
      await this.movieListService.getWatchList();
    }
    this.flashMessagesService.show(
      '<i class="ni ni-notification-70"></i>   &nbsp;&nbsp;&nbsp;  <b>Item removed Successfully</b>',
      {
        cssClass: 'alert-success',
        timeout: 3000,
      }
    );
  }
  async setItem(item: string) {
    if (item == 'all') {
      this.allItem = true;
      this.completed = false;
      this.yet = false;
    }
    if (item == 'completed') {
      this.completed = true;
      this.allItem = false;
      this.yet = false;
    }

    if (item == 'yet') {
      this.completed = false;
      this.allItem = false;
      this.yet = true;
    }
  }
  more(id: any) {
    if (this.type == 'movie') {
      this.router.navigate(['singlemovie', id]);
    }
    if (this.type == 'tv') {
      this.router.navigate(['singletv', id]);
    }
  }
}
