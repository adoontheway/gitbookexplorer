import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { File } from '@ionic-native/file';
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
    this.headers = new Headers();
    this.parser = new DOMParser();
    this.xmlSerializer = new XMLSerializer();
   
    this.headers.append("accept-language","en-US,en;q=0.8");
    this.headers.append("accept","text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
    
    this.platform.ready().then(()=>{
      /*
      this.file.checkDir(this.file.applicationStorageDirectory,'').then(res =>{
        if(!res){
          this.file.createDir(this.file.applicationStorageDirectory,'',false).then(res=>{
            console.log('create books dir success.')
          },err =>{
            console.log('create books dir err:',err)
          });
        }
      })
      */
      // this.downloadedFiles();
    })
    
  }

  explore(page=0,lange=''){
    return new Promise(resolve =>{
      this.alertCtrl.showLoading();
      this.http.get('https://www.gitbook.com/explore?page='+page+'&lange='+lange).subscribe(response=>{
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
        console.log('explore err:',err);
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
      this.http.get('https://www.gitbook.com/search?q='+topic).subscribe(response=>{
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
        console.log('search error:',err);
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
      }, err =>{
        console.log('get topics error:',err);
      })
    }) 
  }
  
  readBook(book){
    return new Promise(resolve =>{
       this.alertCtrl.showLoading();
      this.http.get('https://www.gitbook.com/read/book/'+book.id,{headers:this.headers}).subscribe(response=>{
         resolve(this.parsePage(response,false,book));
      },err => {
        console.log('this.http Load Book Error.',err);
      });
    });
  }

  readPage(url,rootUrl){
    return new Promise(resolve => {
      this.alertCtrl.showLoading();
      this.http.get(url).subscribe(response => {
        resolve(this.parsePage(response,true,null,rootUrl));//({content:content,config:config,next:next, pre:pre,curUrl:response.url,title:title});
      })
    })
  }

  parsePage(response,isPage=true,book=null,rootUrl=''){
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
    config = JSON.parse(config);
    return isPage ?  {content:this.checkContent(content,rootUrl),config:config,next:next, pre:pre,curUrl:response.url,title:title} : {book:book,content:content,config:config,next:next, pre:pre,curUrl:response.url,title:title};
  }
  xmlSerializer:XMLSerializer;
  checkContent(content,rootUrl){
    let xml:XMLDocument;
    let imgs = null;
    xml = this.parser.parseFromString(content,"text/xml");
    imgs = xml.getElementsByTagName('img');//.item(0).attributes.getNamedItem('href').value;
    let len = imgs.length;
    let el;
    for( let i = 0; i < len; i++){
      el = imgs[i];
      if( el.getAttributeNode('src').nodeValue.indexOf('http') == -1){
        el.setAttribute('src',rootUrl+el.getAttributeNode('src').nodeValue);
      }
      // console.log(el);
    }
    return this.xmlSerializer.serializeToString(xml);
  }

  downloadBook(book){
    // console.log(book.urls.download.pdf, this.file.applicationStorageDirectory+book.name+".pdf");
    this.http1.downloadFile(book.urls.download.pdf,{},{},
    
    this.file.applicationStorageDirectory+book.name+".pdf").then(data=>{
      console.log('downloadBook')
    },err =>{
      console.log('download err');
      console.error(err);
    })
  }

  downloadedFiles(){
    return new Promise(resolve => this.file.listDir(this.file.applicationStorageDirectory,'').then(data =>{
      /**
       * data[i]
       * fullPath:"/data/data/io.github.adobeattheworld/front-end-handbook.pdf"
       * isDirectory:false
       * isFile:true
       * name:"front-end-handbook.pdf"
       * nativeURL:"file:///data/data/io.github.adobeattheworld/front-end-handbook.pdf"
       */
      resolve(data);
    }));
  }
}
