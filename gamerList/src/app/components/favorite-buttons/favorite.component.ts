import { Component, Input } from '@angular/core'
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { StoreService } from '../../core/state.service'

import {favoriteStatus} from '../../model/models'

@Component({
    selector: 'favorite',
    templateUrl: './favorite.component.html'
})
export class FavoriteComponent {
    @Input() game;

    @Input() showRating = false;
    private tempFavList: string[] = [];
    private tempPlayList: string[] = [];
    favoriteGames: FirebaseListObservable<any>;
    playedGames: FirebaseListObservable<any>;
    constructor(private af: AngularFire, private StoreService: StoreService) {
        this.favoriteGames = this.af.database.list('/favoriteGames');
        this.playedGames = this.af.database.list('/PlayedGames');
    }
    checkExistingGame(game) {

        return this.StoreService.checkExistingGame(game.id , favoriteStatus.favorite)
    }
    checkPlayExistingGame(game) {
        // this.af.database.list('/favoriteGames',{query: {
        //   orderByChild: 'id',
        //   equalTo: game.id
        // }}).subscribe((value:any) => {
        //      if(value.id === game.id)
        //      game.selected = true;

        //      return true;
        // })
        return this.StoreService.checkExistingGame(game.id , favoriteStatus.played);
    }
    removeItems(game: any, status: favoriteStatus) {

        if (status == favoriteStatus.favorite) {
            this.favoriteGames.remove(game["key-fav"]);
            this.StoreService.removeFromFavorites(game.id);
            delete game["key-fav"];
        }
        else {
            this.playedGames.remove(game["key-played"])
            this.StoreService.removeFromPlayed(game.id);
            delete game["key-played"];
        }

        
    }
    addToFavorites(game) {

        if (game['key-fav'] ) {
            this.removeItems(game, favoriteStatus.favorite);

        } else {

            let g = {
                id: game.id, name: game.name
            };
            if (game.cover) {
                g["cloudinary_id"] = game.cover.cloudinary_id;
            }
            if (game.summary) {
                g["summary"] = game.summary;
            }
            if (game.storyline) {
                g["storyline"] = game.storyline;
            }
             if (game.videos) {
                g["videos"] = game.videos;
            }
              if (game.screenshots) {
                g["screenshots"] = game.screenshots;
            }
            game['key-fav'] = this.favoriteGames.push(g).key;
            this.StoreService.addToFavorites(game.id);

        if (!game['key-played'])
            this.addToPlayed(game);
        }
    }

    addToPlayed(game) {

        if (game['key-played']) {
            this.removeItems(game, favoriteStatus.played);
        } else {
            let g = {
                id: game.id, name: game.name
            };
            if (game.cover) {
                g["cloudinary_id"] = game.cover.cloudinary_id;
            }
            if (game.summary) {
                g["summary"] = game.summary;
            }
              if (game.storyline) {
                g["storyline"] = game.storyline;
            }
             if (game.videos) {
                g["videos"] = game.videos;
            }
              if (game.screenshots) {
                g["screenshots"] = game.screenshots;
            }
            game['key-played'] = this.playedGames.push(g).key;

            this.StoreService.addToPlayed(game.id);
        }
    }


}
