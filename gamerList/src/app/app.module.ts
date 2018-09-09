import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule ,BrowserXhr } from '@angular/http'
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { CollectionPage } from '../pages/collection/collection';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AngularFireModule } from 'angularfire2';
import { CustExtBrowserXhr } from './core/cors.config'
import { fbConf } from './core/dataservice';
import { ExponentialRatePipe } from './core/rate.pipe'
import { DetailPage } from '../pages/detail/detail'
import { ParallaxHeader } from './components/parallax-header/parallax-header';
import { YoutubePlayerMiniModule }  from 'ng2-youtube-player-mini';
import { StoreService } from './core/state.service'
import { FavoriteComponent } from './components/favorite-buttons/favorite.component'
import { RatingComponent } from './components/star-component'
import { MasonryModule } from 'angular2-masonry';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ExpandableHeader } from './components/expandable-header';

@NgModule({
  declarations: [
    MyApp,
    CollectionPage,
    HomePage,
    TabsPage, 
    ExponentialRatePipe, 
    DetailPage, 
    ParallaxHeader, 
    FavoriteComponent,
    RatingComponent, 
    ExpandableHeader
  ],
  imports: [
    IonicModule.forRoot(MyApp), 
      AngularFireModule.initializeApp(fbConf), HttpModule, YoutubePlayerMiniModule , MasonryModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CollectionPage,
    HomePage,
    TabsPage, 
    DetailPage
  ],
  providers: [StoreService, {provide: ErrorHandler, useClass: IonicErrorHandler}, {provide: BrowserXhr, useClass: CustExtBrowserXhr},InAppBrowser]
})
export class AppModule {}
