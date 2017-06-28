import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HTTP } from '@ionic-native/http';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { HttpModule } from '@angular/http';
// import { FormControl } from "@angular/forms";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AboutPageModule } from '../pages/about/about.module';
import { BookPageModule } from '../pages/book/book.module';
import { BookDetailsPageModule } from '../pages/book-details/book-details.module';
import { GitbookProvider } from '../providers/gitbook/gitbook';
import { AlertControllerProvider } from '../providers/alert-controller/alert-controller';
import { LanguageProvider } from '../providers/language/language';

@NgModule({
  declarations: [
    MyApp,
    HomePage
    // BookDetailsPage,
    // AboutPage,
    // BookPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AboutPageModule,
    BookPageModule,
    BookDetailsPageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
    // BookDetailsPage,
    // AboutPage,
    // BookPage
  ],
  providers: [
    StatusBar,
    File,
    FileOpener,
    AlertControllerProvider,
    HTTP,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GitbookProvider,
    AlertControllerProvider,
    LanguageProvider
  ]
})
export class AppModule {}
