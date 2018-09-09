import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http'
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/observable';
import "rxjs/add/operator/map";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/switchMap"
import { Subject } from 'rxjs/Subject';
import { DetailPage } from '../detail/detail'

import { InAppBrowser , InAppBrowserOptions } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  option : InAppBrowserOptions = {location : 'yes' , toolbar:'yes' , hardwareback: 'yes'};
  private newsItems: Observable<Response>;
  
  constructor(private http: Http, private nav: NavController, private iab: InAppBrowser) {
    
  }

  ngOnInit() {
    this.getNews();
  }
  
  getNews() {

    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('X-Mashape-Key', 'oldMashapeAPIKey');
    this.newsItems = this.http.get('https://igdbcom-internet-game-database-v1.p.mashape.com/pulses/?fields=*', { headers: headers }).map(data => data.json());
  }

  openBrowser(url: string) {
    
    if (url) {
      const browser = this.iab.create(url, '_system' , this.option);
      browser.show();
    }
  }
}

