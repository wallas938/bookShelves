import { Component, OnInit } from '@angular/core';
import { Book } from '../models/Book';
import { Subscription } from 'rxjs';
import { BooksService } from '../services/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[] = []
  bookSubscribtion: Subscription

  constructor(
    private bookService: BooksService,
    private router: Router
  ) { }

  ngOnInit() {
    this.bookSubscribtion = this.bookService.booksSubject.subscribe(
      (books: Book[]) => {
        this.books = books
      })
      this.bookService.getBooks()
      this.bookService.emitBooks()
    }

    onNewBook() {
      this.router.navigate(['/books', 'new'])
    }

    onDeleteBook(book: Book) {
      this.bookService.removeBook(book)
    }

    onViewBook(id: number) {
      this.router.navigate(['/books', 'view', id])
    }

    ngOnDestroy(): void {
      //Called once, before the instance is destroyed.
      //Add 'implements OnDestroy' to the class.
      this.bookSubscribtion.unsubscribe()
    }
  } 
