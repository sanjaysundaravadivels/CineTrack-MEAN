import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { WatchlistService } from 'src/app/services/watchlist.service';
import { FlashMessagesService } from 'flash-messages-angular';
import { CompletedlistService } from 'src/app/services/completedlist.service';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  myvar = '';
  myId = '';
  focus: any;
  focus1: any;
  modalOpen: boolean = false;
  closeResult: any;

  constructor(
    public bookService: BookService,
    private modalService: NgbModal,
    public authService: AuthService,
    public watchListService: WatchlistService,
    public completedListService: CompletedlistService,
    private flashMessagesService: FlashMessagesService
  ) {}

  ngOnInit(): void {}
  async openVerticallyCentered(content: any, id: any) {
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

    this.modalService.open(content, { centered: true });
  }
  async yetListBook(id: any, title: any, picture: any, authors: any) {
    if (this.authService.islogin) {
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
  async completedListBook(id: any, title: any, picture: any, authors: any) {
    if (this.authService.islogin) {
      const completedList = {
        isCompleted: true,
        title: title,
        id: id,
        picture: picture,
        authors: authors,
      };

      // this.completedListService.getcompletedList();
      let d = await this.watchListService.sendBook(completedList);

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
  myFun(e: any) {
    this.myvar = e.target.value;
  }
  setModal() {
    this.modalOpen = !this.modalOpen;
  }
  gBook(url: any) {}
  onSub(e: any): void {
    e.preventDefault();

    this.bookService.hasThumb = [];
    this.bookService.getBooks(this.myvar);
  }
}
