import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HTTP } from '@ionic-native/http';
import { File } from '@ionic-native/file';
import { HttpModule } from '@angular/http';
// import { FormControl } from "@angular/forms";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { BookPage } from '../pages/book/book';
import { BookDetailsPage } from '../pages/book-details/book-details';
import { GitbookProvider } from '../providers/gitbook/gitbook';
import { AlertControllerProvider } from '../providers/alert-controller/alert-controller';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BookDetailsPage,
    AboutPage,
    BookPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BookDetailsPage,
    AboutPage,
    BookPage
  ],
  providers: [
    StatusBar,
    File,
    AlertControllerProvider,
    HTTP,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GitbookProvider,
    AlertControllerProvider,
    AlertControllerProvider
  ]
})
export class AppModule {}
