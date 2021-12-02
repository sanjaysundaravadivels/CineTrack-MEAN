import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { AuthService } from './services/auth.service';
import { KeyfeaturesComponent } from './components/keyfeatures/keyfeatures.component';
import { ContactComponent } from './components/contact/contact.component';
import { BookComponent } from './components/book/book.component';
import { MoviesComponent } from './components/movies/movies.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SingleMovieComponent } from './components/single-movie/single-movie.component';
import { SingleTvComponent } from './components/single-tv/single-tv.component';
import { AuthGuard } from './gaurd/auth.guard';

const routes: Routes = [];
const CLIENT_ID =
  '210919768460-tlrb8mtabkelddo6i8sbmge3lmtdk61d.apps.googleusercontent.com';

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }),
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'keyfeatures',
        component: KeyfeaturesComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path: 'books',
        component: BookComponent,
      },
      {
        path: 'movies',
        component: MoviesComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'singlemovie/:id',
        component: SingleMovieComponent,
        runGuardsAndResolvers: 'paramsChange',
      },
      {
        path: 'singletv/:id',
        component: SingleTvComponent,
        runGuardsAndResolvers: 'paramsChange',
      },
    ]),
    BrowserModule,
    FormsModule,
    SocialLoginModule,
  ],
  providers: [
    AuthService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(CLIENT_ID),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
