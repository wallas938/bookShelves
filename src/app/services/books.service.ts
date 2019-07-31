import { Injectable } from '@angular/core';
import { Book } from '../models/Book';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class BooksService {
  books: Book[] = []
  booksSubject = new Subject<Book[]>()

  constructor() { }

  emitBooks() {
    this.booksSubject.next(this.books.slice())
  }

  saveBooks() {
    firebase.database()
      .ref('/books')
      .set(this.books)
      .then(
        () => {
          console.log('succeeded')
        }, (er) => {
          console.log(er)
        }
      )
  }

  getBooks() {
    firebase.database()
      .ref('/books')
      .on('value', (data) => {
        this.books = data.val() ? data.val() : []
        this.emitBooks()
      })
  }

  getSingleBook(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database()
          .ref('/books/' + id)
          .once('value')
          .then(
            data => {
              console.log(data.val())
              resolve(data.val())
            }, (error) => {
              reject(error)
            }
          )
      }
    )
  }

  createNewBook(newBook: Book) {
    this.books.push(newBook)
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(book: Book) {
    const bookIndexToRemove = this.books.findIndex(
      bookEl => {
        if (bookEl === book)
          return true
      }
    )
    this.books.splice(bookIndexToRemove, 1)
    this.saveBooks()
    this.emitBooks()
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFilename = Date.now().toString()
        firebase.storage()
          .ref()
          .child('images/' + almostUniqueFilename + file.name)
          .put(file)
          .then(
            snapshot => {
              console.log(snapshot)
              return snapshot.ref.getDownloadURL()
            })
          .then(
            downloadUrl => {
              console.log(downloadUrl)
              resolve(downloadUrl)
            }, (error) => {
              console.log(error)
              reject()
            }
          )
      }
    )
  }
}
