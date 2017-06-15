import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GitbookProvider } from '../../providers/gitbook/gitbook';

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
  title:string;
  content:any;
  book:any;
  config:any;
  hasPre = false;
  hasNext = false;
  nextPage:string;
  prePage:string;
  curUrl:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public gitbook:GitbookProvider) {
    let config = this.navParams.get('config');
    this.content = config.content;
    this.book = config.book;
    this.config = config.config;
    this.hasNext = config.next != null;
    this.hasPre = config.pres != null;
    this.title = config.title;
    this.nextPage = config.next;
    this.prePage = config.pre;
    this.curUrl = config.curUrl;
    // console.log(this.content);
  }

  showPre(){
    this.gitbook.readPage(this.curUrl+this.prePage).then(data=>{
       this.content = data['content'];
      this.nextPage = data['next'];
      this.prePage = data['pre'];
      this.hasNext = data['next'] != null;
      this.hasPre = data['pre'] != null;
      this.title = data['title'];
    })
  }

  showNext(){
     this.gitbook.readPage(this.curUrl+this.nextPage).then(data=>{
      this.content = data['content'];
      this.nextPage = data['next'];
      this.prePage = data['pre'];
      this.hasNext = data['next'] != null;
      this.hasPre = data['pre'] != null;
      this.title = data['title'];
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookPage');
  }

}
