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
  rootUrl:string;
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
    this.curUrl = this.rootUrl = config.curUrl;
    // console.log(this.content);
  }

  showPre(){
    let url;
    if( this.curUrl[this.curUrl.length-1] == "/"){
      url = this.curUrl+this.prePage;
    }else{
      url = this.rootUrl+this.prePage;
    }
    this.gitbook.readPage(url,this.rootUrl).then(data=>{
      this.content = data['content'];
      this.nextPage = data['next'];
      this.prePage = data['pre'];
      this.hasNext = data['next'] != null;
      this.hasPre = data['pre'] != null;
      this.title = data['title'];
      this.curUrl = data['curUrl'];
    })
  }

  showNext(){
    let url;
    if( this.curUrl[this.curUrl.length-1] == "/"){
      url = this.curUrl+this.nextPage;
    }else{
      url = this.rootUrl+this.nextPage;
    }
     this.gitbook.readPage(url,this.rootUrl).then(data=>{
      this.content = data['content'];
      this.nextPage = data['next'];
      this.prePage = data['pre'];
      this.hasNext = data['next'] != null;
      this.hasPre = data['pre'] != null;
      this.title = data['title'];
      this.curUrl = data['curUrl'];
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookPage');
  }
}
