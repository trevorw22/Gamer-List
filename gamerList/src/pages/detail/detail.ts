import { Component} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { NavController, NavParams } from 'ionic-angular';
import { InAppBrowser , InAppBrowserOptions } from '@ionic-native/in-app-browser';
@Component({
  selector: 'page-about',
  templateUrl: 'detail.html'
})
export class DetailPage {
  option : InAppBrowserOptions = {location : 'yes' , toolbar:'yes' , hardwareback: 'yes'};
  private game: any;
   sliderOptions: any;
  favoriteGames: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, af: AngularFire, private navParams: NavParams, private sanitizer: DomSanitizer, private iab: InAppBrowser) {
    this.favoriteGames = af.database.list('/favoriteGames');
    this.game = this.navParams.get('game');
    this.sliderOptions = {
      pager: true
    };
  }
  
  makeUrl(image) : SafeUrl {
   
    if (image)
      return this.sanitizer.bypassSecurityTrustResourceUrl(`//images.igdb.com/igdb/image/upload/t_screenshot_med_2x/${image.cloudinary_id}.png?fields=screenshot_big_fit`);

  }

  openBrowser(name: string) {
    
    if (name) {
      const browser = this.iab.create(`https://www.g2a.com/?search=${name}&&reflink=gamerlist`, '_system' , this.option);
      browser.show();
    }
  }
}
