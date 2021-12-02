import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import ISO6391 from 'iso-639-1';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { FlashMessagesService } from 'flash-messages-angular';
import { AuthService } from 'src/app/services/auth.service';
import { CompletedlistService } from 'src/app/services/completedlist.service';
import { WatchlistService } from 'src/app/services/watchlist.service';
import { MovielistService } from 'src/app/services/movielist.service';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.css'],
})
export class SingleMovieComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    public movieService: MovieService,
    private sanitizer: DomSanitizer,
    private spinner: NgxSpinnerService,
    private router: Router,
    private flashMessagesService: FlashMessagesService,
    public authService: AuthService,
    public watchListService: WatchlistService,
    public movieListService: MovielistService
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }
  sub: any;
  id: any;
  back: String = '';
  lang: String = '';
  isCast: boolean = true;
  isCrew: boolean = false;
  navigationSubscription: any;

  initialiseInvites() {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params.id;
    });
    this.movieService.getSingleMovie(this.id);

    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 4000);
  }
  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  onClick(type: string) {
    if (type == 'cast') {
      this.isCast = true;
      this.isCrew = false;
    }
    if (type == 'crew') {
      this.isCrew = true;
      this.isCast = false;
    }
  }
  onList(type: String) {}
  sim(id: any) {
    this.router.navigate(['singlemovie', id]);
  }
  async yetListMovie(id: any, title: any, picture: any, ratings: any) {
    if (this.authService.islogin) {
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

      if (this.movieListService.putRes.success) {
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
    } else {
      this.flashMessagesService.show(
        '<i class="ni ni-notification-70"></i>   &nbsp;&nbsp;&nbsp;  <b>Sign in to access this feature</b>',
        {
          cssClass: 'alert-success',
          timeout: 3000,
        }
      );
    }
  }
  async completedListMovie(id: any, title: any, picture: any, ratings: any) {
    if (this.authService.islogin) {
      const completedList = {
        isCompleted: true,
        type: 'movie',
        title: title,
        id: id,
        picture: picture,
        ratings: ratings,
      };

      // this.completedListService.getcompletedList();
      let d = await this.movieListService.sendMovie(completedList);

      if (this.movieListService.putRes.success) {
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
    } else {
      this.flashMessagesService.show(
        '<i class="ni ni-notification-70"></i>   &nbsp;&nbsp;&nbsp;  <b>Sign in to access this feature</b>',
        {
          cssClass: 'alert-success',
          timeout: 3000,
        }
      );
    }
  }
  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we
    // don't then we will continue to run our initialiseInvites()
    // method on every navigationEnd event.
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
}
