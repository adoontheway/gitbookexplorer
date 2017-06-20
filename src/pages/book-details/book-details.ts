import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams,NavController } from 'ionic-angular';
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
  navCtrl:NavController;
  constructor(public view: ViewController, public navParams: NavParams,public gitbook:GitbookProvider) {
    this.book = this.navParams.get('book');
    this.navCtrl = this.navParams.get('nav');
    this.book_cover = 'https://www.gitbook.com'+this.book.cover.small;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad BookDetailsPage');
  }
  
  download(){
    this.gitbook.downloadBook(this.book);
  }

  close(){
    this.view.dismiss();
  }
  read(book){
    this.view.dismiss();
    this.gitbook.readBook(book).then(data =>{
      this.navCtrl.push(BookPage,{config:data});
    })
  }
}
