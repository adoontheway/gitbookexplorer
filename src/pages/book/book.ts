import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BookPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-book',
  templateUrl: 'book.html',
})
export class BookPage {
  content:any;
  book:any;
  config:any;
  hasPre = false;
  hasNext = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let config = this.navParams.get('config');
    this.content = config.content;
    this.book = config.book;
    this.config = config.config;
    this.hasNext = this.config.page.next != null;
    console.log(this.content);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookPage');
  }

}
