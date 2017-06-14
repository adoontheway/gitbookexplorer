import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';
/*
  Generated class for the AlertControllerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AlertControllerProvider {

  constructor(public loadCtrl: LoadingController) {
    console.log('Hello AlertControllerProvider Provider');
  }
  showLoading(){
    let loader = this.loadCtrl.create({content:'Hange on, almost there...', duration:3000});
    loader.present();
  }
}
