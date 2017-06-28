import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CachebooksPage } from './cachebooks';

@NgModule({
  declarations: [
    CachebooksPage,
  ],
  imports: [
    IonicPageModule.forChild(CachebooksPage),
  ],
  exports: [
    CachebooksPage
  ]
})
export class CachebooksPageModule {}
