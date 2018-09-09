import { Component, OnInit, NgZone } from '@angular/core';
import { Http, Headers } from '@angular/http'
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/observable';
import "rxjs/add/operator/map";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/switchMap"
import { Subject } from 'rxjs/Subject';
import { DetailPage } from '../detail/detail'

@Component({
  selector: 'page-collection',
  templateUrl: 'collection.html',
  styles: [`
       .brick { width: 200px; padding:0 !important;  margin:0 !important}
     `]
})
export class CollectionPage implements OnInit {
  searchTerms = new Subject<string>();

  search(terms: Observable<string>) {
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.getItems(term));
  }

  collectionType: string = "Favorites";
  changeType: Subject<string>;
  games: any[];
  favoriteGames: any[];
  grid: Array<Array<any>>;
  private discoverGames: any[] = [];
  playedGames: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, private af: AngularFire, private zone: NgZone, private http: Http, ) {
    this.changeType = new Subject<string>();

    this.search(this.searchTerms).subscribe(results => {
      debugger;
      console.log(results);
      if (this.collectionType === 'Discover')
        this.discoverGames = results;
      else
        this.games = results;
    })

  }

  getItems(val: string) {

    if (this.collectionType === 'Discover') {
      return this.http.post('http://localhost:3000/games', { data: val }).map(res => {
        return res.json()['body']
      });

    } else {
       this.getGamesByQuery(val);
       return null;
    }
  }

  navigate(game) {
    this.navCtrl.push(DetailPage, { game: game })
  }

  ngOnInit() {

    this.changeType.subscribe(value => {

      this.collectionType = value;
      let num = 0;
      const url = value == 'Favorites' ? '/favoriteGames' : '/PlayedGames';
      this.af.database.list(url).subscribe((values: any[]) => {
        this.games = values;
        // this.grid = Array(Math.ceil(values.length / 2));
        // for (let i = 0; i <= values.length; i += 2) {

        //   this.grid[num] = Array(2);

        //   if (values[i]) {
        //     this.grid[num][0] = values[i];
        //   }

        //   if (values[i + 1])
        //     this.grid[num][1] = values[i + 1]

        //   num++;

        // }

      })
    });

    this.changeType.next('Favorites');
  }

  getGamesByQuery(searchTerm: string) {
    debugger;
    const url = this.collectionType == 'Favorites' ? '/favoriteGames' : '/PlayedGames';
    let endAt = `${searchTerm}\uf8ff`
    this.af.database.list(url, {
      query: {
        orderByChild: 'name',
        startAt: searchTerm,
        endAt: endAt
      }
    }).subscribe((data:any) => {
      debugger;
      console.log(data.key);
    });
  }



}
