import { Component,ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { NavController,Platform,ModalController } from 'ionic-angular';
import { GitbookProvider } from '../../providers/gitbook/gitbook';
import { BookDetailsPage } from '../book-details/book-details';
import { BookPage } from '../book/book';
import { AboutPage } from '../about/about';
// import { FormControl } from "@angular/forms";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('content') content:Content;

  books:any = [];
  page:number = 0;
  total:number = 0;
  topics:any = [];
  pages:number = 0;
  topicValue:string = "";
  type:string = "books";
  sort:string = "default";
  showStarOption = true;
  hasPre = false;
  hasNext = false;
  // topicControl:FormControl;
  
  constructor(public navCtrl: NavController,public platform:Platform, public gitbook:GitbookProvider,public modalCtrl:ModalController) {
    // this.topicControl = new FormControl();
   
  }
  ionViewDidLoad(){
    this.platform.ready().then(()=>{
      this.gitbook.explore().then(data =>{
        // console.log(data);
        this.books = data['books']['list'];
        this.page = data['books']['page']+1;
        this.pages = data['books']['pages'];
        this.hasPre = this.page > 1;
        this.hasNext = this.page < this.pages;
        this.total = data['books']['total'];
        this.topics = data['topics'];
      });
    });
  }
  showDetails(book){
      let details = this.modalCtrl.create(BookDetailsPage,{book:book,nav:this.navCtrl});
      details.present();
  }

  read(book){
    this.gitbook.readBook(book).then(data =>{
      this.navCtrl.push(BookPage,{config:data});
    })
  }
  showAbout(){
    let about = this.modalCtrl.create(AboutPage);
    about.present();
  }
  onSearchInput(evt){
    let val = evt.target.value;
    this.startSearch(val);
  }

  onSearchCancel($event){
    
  }
  startSearch(val){
    this.gitbook.search(this.topicValue).then(data =>{
        this.books = data['results']['list'];
        this.page = data['results']['page']+1;
        this.pages = data['results']['pages'];
        this.total = data['results']['total'];
        this.hasPre = this.page > 1;
        this.hasNext = this.page < this.pages;
      });
  }

  showTopic(topic){
    this.gitbook.getTopic(topic).then(data =>{
        console.log(data);
        this.books = data['books']['list'];
        this.page = data['books']['page']+1;
        this.pages = data['books']['pages'];
        this.total = data['books']['total'];
        this.topics = data['topics'];
        this.hasPre = this.page > 1;
        this.hasNext = this.page < this.pages;
      });
  }

  prePage(){
    this.gitbook.explore(this.page-2).then(data =>{
        this.books = data['books']['list'];
        this.page = data['books']['page']+1;
        this.pages = data['books']['pages'];
        this.hasPre = this.page > 1;
        this.hasNext = this.page < this.pages;
        this.total = data['books']['total'];
        this.topics = data['topics'];
        this.content.scrollToTop(1000);
      });
  } 

  nextPage(){
    this.gitbook.explore(this.page).then(data =>{
        this.books = data['books']['list'];
        this.page = data['books']['page']+1;
        this.pages = data['books']['pages'];
        this.hasPre = this.page > 1;
        this.hasNext = this.page < this.pages;
        this.total = data['books']['total'];
        this.topics = data['topics'];
        this.content.scrollToTop(1000);
      });
  }
}
