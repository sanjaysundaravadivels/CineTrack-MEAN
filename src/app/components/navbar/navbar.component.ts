import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { ACTION_LOGIN } from 'src/app/store/actions/appActions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public isCollapsed = true;
  public isLoggedin = false;
  public name: string = '';
  public email: string = '';
  public picture: string = '';

  constructor(
    public location: Location,
    private router: Router,
    public authService: AuthService,
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.isLoggedin = this.authService.islogin;
    const token = localStorage.getItem('id_token');
    if (token) {
      const name = localStorage.getItem('user_name');
      const email = localStorage.getItem('user_email');
      const picture = localStorage.getItem('user_picture');
      let user = {
        name,
        email,
        picture,
        token,
        success: true,
      };
      this.store.dispatch(ACTION_LOGIN({ user }));

      this.authService.getState().subscribe(async (state) => {
        this.email = state.user.email;
        this.name = state.user.name;
        this.picture = state.user.picture;
      });
      this.authService.loadToken();
    }
  }

  isClicked = () => {
    this.isLoggedin = this.authService.islogin;
    if (this.isLoggedin) {
      this.authService.signOut();
      this.router.navigate(['/']);
    } else {
      this.authService.signIn();
    }

    this.authService.getState().subscribe((state) => {
      if (state.login) {
        this.isLoggedin = true;
        this.name = state.user.name;
        this.email = state.user.email;
        this.picture = state.user.picture;
        localStorage.setItem('user_name', this.name);
        localStorage.setItem('user_email', this.email);
        localStorage.setItem('user_picture', this.picture);
      } else {
        this.isLoggedin = false;
      }
    });
  };
}
