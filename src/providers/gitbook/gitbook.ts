import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
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
  parser:DOMParser;
  headers:Headers;
  constructor(public http: Http, public http1:HTTP,public platform:Platform, public file:File,public alertCtrl:AlertControllerProvider) {
    // console.log('Hello GitbookProvider Provider');
    this.headers = new Headers();
    this.parser = new DOMParser();
    // this.headers.append("accept-encoding","gzip, deflate, sdch, br");
    this.headers.append("accept-language","en-US,en;q=0.8");
    this.headers.append("accept","text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
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
      this.http.get('https://www.gitbook.com/read/book/'+book.id,{headers:this.headers}).subscribe(response=>{
        // console.log(response);
        var rawData:string = response['_body'];
        let index = rawData.indexOf('<section ');
        let content = rawData.substring(index);
        let next = null;
        let pre = null;
        let title = rawData.substring(rawData.indexOf('<title>')+7,rawData.indexOf('</title>'));
        index = content.indexOf("</section>");
        content = content.substring(0,index+10);
        index = rawData.indexOf("gitbook.page.hasChanged(");
        let config;
        if( index != -1){
          config = rawData.substring(index+24);
          index = config.indexOf('}});');
          config = config.substring(0,index+2);
        }else if( rawData.indexOf("var config = {") != -1){
          index = rawData.indexOf("var config = {");
          config = rawData.substring(index+13);
          index = config.indexOf("}};");
          config = config.substring(0,index+2);
        }
        let tempXML;
        let xml:XMLDocument;
        let tempIndex = rawData.indexOf("navigation navigation-prev");
        if( tempIndex != -1){
          index = rawData.lastIndexOf("<a",tempIndex);
          tempXML = rawData.substring(index, rawData.indexOf("</a>",tempIndex)+4);
          xml = this.parser.parseFromString(tempXML,"text/xml");
          pre = xml.getElementsByTagName('a').item(0).attributes.getNamedItem('href').value
        }

        tempIndex = rawData.indexOf("navigation navigation-next");
         if( tempIndex != -1){
          index = rawData.lastIndexOf("<a",tempIndex);
          tempXML = rawData.substring(index, rawData.indexOf("</a>",tempIndex)+4);
          xml = this.parser.parseFromString(tempXML,"text/xml");
          next = xml.getElementsByTagName('a').item(0).attributes.getNamedItem('href').value;
        }
        
        // console.log(content);
        config = JSON.parse(config);
        // console.log(config);
        resolve({book:book,content:content,config:config,next:next, pre:pre,curUrl:response.url,title:title});
        // this.loader.dismiss();
      },err => {
        console.log('this.http Load Book Error.',err);
      });
    });
  }

  readPage(url){
    return new Promise(resolve => {
      this.alertCtrl.showLoading();
      this.http.get(url).subscribe(response => {
        var rawData:string = response['_body'];
        let index = rawData.indexOf('<section ');
        let content = rawData.substring(index);
        let next = null;
        let pre = null;
        let title = rawData.substring(rawData.indexOf('<title>')+7,rawData.indexOf('</title>'));
        index = content.indexOf("</section>");
        content = content.substring(0,index+10);
        index = rawData.indexOf("gitbook.page.hasChanged(");
        let config;
        if( index != -1){
          config = rawData.substring(index+24);
          index = config.indexOf('}});');
          config = config.substring(0,index+2);
        }else if( rawData.indexOf("var config = {") != -1){
          index = rawData.indexOf("var config = {");
          config = rawData.substring(index+13);
          index = config.indexOf("}};");
          config = config.substring(0,index+2);
        }
        let tempXML;
        let xml:XMLDocument;
        let tempIndex = rawData.indexOf("navigation navigation-prev");
        if( tempIndex != -1){
          index = rawData.lastIndexOf("<a",tempIndex);
          tempXML = rawData.substring(index, rawData.indexOf("</a>",tempIndex)+4);
          xml = this.parser.parseFromString(tempXML,"text/xml");
          pre = xml.getElementsByTagName('a').item(0).attributes.getNamedItem('href').value
        }

        tempIndex = rawData.indexOf("navigation navigation-next");
         if( tempIndex != -1){
          index = rawData.lastIndexOf("<a",tempIndex);
          tempXML = rawData.substring(index, rawData.indexOf("</a>",tempIndex)+4);
          xml = this.parser.parseFromString(tempXML,"text/xml");
          next = xml.getElementsByTagName('a').item(0).attributes.getNamedItem('href').value;
        }
        
        // console.log(content);
        config = JSON.parse(config);
        // console.log(config);
        resolve({content:content,config:config,next:next, pre:pre,curUrl:response.url,title:title});
      })
    })
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
