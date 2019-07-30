import { Component } from '@angular/core';
import * as firebase from 'firebase'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestionnaire-de-livre';

  constructor() {
    var firebaseConfig = {
      apiKey: "AIzaSyAy1UhjNO70sIMlibMV8C-_16Nq483ATJw",
      authDomain: "bookshelves-ad036.firebaseapp.com",
      databaseURL: "https://bookshelves-ad036.firebaseio.com",
      projectId: "bookshelves-ad036",
      storageBucket: "",
      messagingSenderId: "591959863427",
      appId: "1:591959863427:web:32b17e255d86da2a"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
