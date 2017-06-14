import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BookDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-book-details',
  templateUrl: 'book-details.html',
})
export class BookDetailsPage {
  book:any = null;
  book_cover:string = '';
  constructor(public view: ViewController, public navParams: NavParams) {
    this.book = this.navParams.get('book');
    this.book_cover = 'https://www.gitbook.com'+this.book.cover.small;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookDetailsPage');
  }
  download(){
    
  }
  close(){
    this.view.dismiss();
  }
}
