import { Component } from '@angular/core';
import { IonicPage, NavParams,NavController } from 'ionic-angular';
import { GitbookProvider } from '../../providers/gitbook/gitbook';
import { BookPage } from '../book/book';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,public gitbook:GitbookProvider) {
    this.book = this.navParams.get('book');
    this.book_cover = 'https://www.gitbook.com'+this.book.cover.small;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad BookDetailsPage');
  }
  
  download(){
    this.gitbook.downloadBook(this.book);
  }

  read(book){
    this.gitbook.readBook(book).then(data =>{
      this.navCtrl.push(BookPage,{config:data});
    })
  }
}
