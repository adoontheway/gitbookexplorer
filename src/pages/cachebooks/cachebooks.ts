import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { GitbookProvider } from '../../providers/gitbook/gitbook';
import { FileOpener } from '@ionic-native/file-opener';
import { LanguageProvider } from '../../providers/language/language';
/**
 * Generated class for the CachebooksPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cachebooks',
  templateUrl: 'cachebooks.html',
})
export class CachebooksPage {
  books;
  constructor(public navCtrl: NavController, public gitbook:GitbookProvider,public lang:LanguageProvider,public fileOpener:FileOpener) {
  }

  ionViewDidLoad() {
    this.gitbook.downloadedFiles().then(data =>{
      this.books = data;
    })
  }

  read(book){
    this.fileOpener.open(book.fullpath,'application/pdf').then(() => {
      console.log(book.name,' opened');
    }).catch(err =>{
      console.log('err occurred when open:',book.name);
      console.error(err);
    })
  }
}
