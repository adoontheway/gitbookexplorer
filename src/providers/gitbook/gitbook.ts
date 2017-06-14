import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { File } from '@ionic-native/file';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';
import { AlertControllerProvider } from '../../providers/alert-controller/alert-controller';
/*
  Generated class for the GitbookProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GitbookProvider {
  data:any=null;
  constructor(public http: Http, public http1:HTTP,public platform:Platform, public file:File,public alertCtrl:AlertControllerProvider) {
    // console.log('Hello GitbookProvider Provider');
  }

  explore(){
    return new Promise(resolve =>{
      this.alertCtrl.showLoading();
      this.http.get('https://www.gitbook.com/explore').subscribe(response=>{
        var rawData:string = response['_body'];
        let index = rawData.indexOf('document.getElementById("application")');
        rawData = rawData.substring(0, index);
        index = rawData.lastIndexOf("}");
        rawData = rawData.substring(0,index);
        index = rawData.indexOf("props:");
        rawData = rawData.substring(index+6);
        this.data = JSON.parse(rawData);
        resolve(this.data);
      }, err =>{
        console.log('Ooops!');
      })
    })
  }

  getDetails(book){
    return new Promise(resolve => {
       this.alertCtrl.showLoading();
      this.http.get('https://www.gitbook.com/book/'+book.id+'/details').subscribe(response=>{

      });
    })
  }

  search(topic){
     return new Promise(resolve => {
       this.alertCtrl.showLoading();
      this.http.get('https://www.gitbook.com/book/frontendmasters/front-end-handbook/details').subscribe(response=>{
        //  this.loader.dismiss();
      });
    })
  }

  getTopic(topic){
    return new Promise(resolve =>{
       this.alertCtrl.showLoading();
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
        //  this.loader.dismiss();
      }, err =>{
        console.log('Ooops!');
      })
    }) 
  }
  
  readBook(book){
    return new Promise(resolve =>{
       this.alertCtrl.showLoading();
      this.http.get('https://www.gitbook.com/read/book/'+book.id).subscribe(response=>{
        var rawData:string = response['_body'];
        let index = rawData.indexOf('<section class="normal markdown-section">');
        let content = rawData.substring(index+41);
        index = content.indexOf("</section>");
        content = content.substring(0,index);
        index = rawData.indexOf("gitbook.page.hasChanged(");
        let config = rawData.substring(index+24);
        index = config.indexOf('}});');
        config = config.substring(0,index+2);
        
        // console.log(content);
        config = JSON.parse(config);
        // console.log(config);
        resolve({book:book,content:content,config:config});
        // this.loader.dismiss();
      },err => {
        console.log('this.http Load Book Error.',err);
      });
    });
  }

  downloadBook(book){
    console.log(book.urls.pdf, this.file.applicationStorageDirectory);
    this.http1.downloadFile(book.urls.pdf,{},{},this.file.applicationStorageDirectory).then(data=>{
      console.log('downloadBook')
    },err =>{
      console.log('download err');
      console.error(err);
    })
  }
}
