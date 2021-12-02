import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeyfeaturesComponent } from './components/keyfeatures/keyfeatures.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ContactComponent } from './components/contact/contact.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { BookComponent } from './components/book/book.component';
import { MoviesComponent } from './components/movies/movies.component';
import { FlashMessagesModule } from 'flash-messages-angular';
import { ProfileComponent } from './components/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SingleMovieComponent } from './components/single-movie/single-movie.component';
import { SingleTvComponent } from './components/single-tv/single-tv.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
@NgModule({
  declarations: [
    AppComponent,
    KeyfeaturesComponent,
    HomeComponent,
    NavbarComponent,
    ContactComponent,
    BookComponent,
    MoviesComponent,
    ProfileComponent,
    SingleMovieComponent,
    SingleTvComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    FlashMessagesModule.forRoot(),
    StoreModule.forRoot(reducers, {}),
    MatProgressSpinnerModule,
    NgxSpinnerModule,
    IvyCarouselModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
