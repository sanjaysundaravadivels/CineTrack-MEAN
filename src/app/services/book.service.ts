import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  books: any = {
    items: {},
  };
  singleBook: any = { volumeInfo: { imageLinks: { thumbnail: '' } } };
  hasSingleBook: boolean = false;
  hasThumb: boolean[] = [];
  KEY = 'AIzaSyAjy-6SCfOyl2LZPT9lIY4z-H7-m8v-kRw';
  constructor(private http: HttpClient) {}
  getBooks(name: string) {
    this.http
      .get(
        'https://www.googleapis.com/books/v1/volumes?q=' +
          name +
          '&key=' +
          this.KEY
      )
      .subscribe((data) => {
        this.books = { ...this.books, ...data };
        this.books.items.pop();
        console.log(this.books);
        for (let index = 0; index < this.books.items.length; index++) {
          const element = this.books.items[index];
          try {
            element.volumeInfo.imageLinks.thumbnail;
            this.hasThumb.push(true);
          } catch (error) {
            this.hasThumb.push(false);
          }
        }
      });
  }
  async getSingleBook(id: any) {
    await this.http
      .get(
        'https://www.googleapis.com/books/v1/volumes/' + id + '?key=' + this.KEY
      )
      .toPromise()
      .then((data) => {
        this.singleBook = { ...this.singleBook, ...data };
        this.hasSingleBook = true;
        try {
          this.singleBook.volumeInfo.description =
            this.singleBook.volumeInfo.description.replace(
              /<\/?[^>]+(>|$)/g,
              ''
            );
        } catch (error) {
          this.singleBook.volumeInfo.description =
            this.singleBook.volumeInfo.title;
        }
      });

    return new Promise((resolve) => setTimeout(resolve, 500));
  }
}
