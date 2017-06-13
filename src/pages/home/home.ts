import { Component } from '@angular/core';
import { NavController,Platform,ModalController } from 'ionic-angular';
import { GitbookProvider } from '../../providers/gitbook/gitbook';
import { BookDetailsPage } from '../book-details/book-details';
import { AboutPage } from '../about/about';
import { FormControl } from "@angular/forms";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  books:any = [];
  page:number = 0;
  total:number = 0;
  topics:any = [];
  pages:number = 0;
  topicValue:string = "";
  topicControl:FormControl;
  
  constructor(public navCtrl: NavController,public platform:Platform, public gitbook:GitbookProvider,public modalCtrl:ModalController) {
    this.topicControl = new FormControl();
   
  }
  ionViewDidLoad(){
    this.platform.ready().then(()=>{
      this.gitbook.explore().then(data =>{
        // console.log(data);
        this.books = data['books']['list'];
        this.page = data['books']['page']+1;
        this.pages = data['books']['pages'];
        this.total = data['books']['total'];
        this.topics = data['topics'];
      })
    })
  }
  showDetails(book){
    let details = this.modalCtrl.create(BookDetailsPage,{book:book});
    details.present();
  }
  read(book){
    this.gitbook.detail(book);
  }
  showAbout(){
    let about = this.modalCtrl.create(AboutPage);
    about.present();
  }

  startSearch(){
    this.gitbook.search(this.topicValue).then((data => {

    }));
  }

  showTopic(topic){
    this.gitbook.getTopic(topic).then(data =>{
        console.log(data);
        this.books = data['books']['list'];
        this.page = data['books']['page']+1;
        this.pages = data['books']['pages'];
        this.total = data['books']['total'];
        this.topics = data['topics'];
      });
  } 
}
