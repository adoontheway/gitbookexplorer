import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/map';
import { Platform,Loading,LoadingController } from 'ionic-angular';
/*
  Generated class for the GitbookProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GitbookProvider {
  data:any=null;
  loader:Loading;
  constructor(public http: Http, public platform:Platform, public loadCtrl:LoadingController) {
    // console.log('Hello GitbookProvider Provider');
     this.loader = this.loadCtrl.create({content:"Almost there, Hang on.."});
  }

  explore(){
    return new Promise(resolve =>{
      this.loader.present();
      this.http.get('/explore').subscribe(response=>{
        var rawData:string = response['_body'];
        let index = rawData.indexOf('document.getElementById("application")');
        rawData = rawData.substring(0, index);
        index = rawData.lastIndexOf("}");
        rawData = rawData.substring(0,index);
        index = rawData.indexOf("props:");
        rawData = rawData.substring(index+6);
        this.data = JSON.parse(rawData);
        resolve(this.data);
        this.loader.dismiss();
      }, err =>{
        console.log('Ooops!');
      })
    })
  }

  detail(book){
    return new Promise(resolve => {
      this.loader.present();
      this.http.get('/book/frontendmasters/front-end-handbook/details').subscribe(response=>{
         this.loader.dismiss();
      });
    })
  }

  search(topic){
     return new Promise(resolve => {
       this.loader.present();
      this.http.get('/book/frontendmasters/front-end-handbook/details').subscribe(response=>{
         this.loader.dismiss();
      });
    })
  }

  getTopic(topic){
    return new Promise(resolve =>{
      this.loader.present();
      this.http.get(topic.urls.explore).subscribe(response=>{
        var rawData:string = response['_body'];
        let index = rawData.indexOf('document.getElementById("application")');
        rawData = rawData.substring(0, index);
        index = rawData.lastIndexOf("}");
        rawData = rawData.substring(0,index);
        index = rawData.indexOf("props:");
        rawData = rawData.substring(index+6);
        this.data = JSON.parse(rawData);
        resolve(this.data);
         this.loader.dismiss();
      }, err =>{
        console.log('Ooops!');
      })
    }) 
  }

  downloadBook(book){
    // this.http.downloadFile(book.urls.pdf)
  }
}
