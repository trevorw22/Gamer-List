import { Injectable } from '@angular/core'
import { favoriteStatus } from '../model/models'
@Injectable()
export class StoreService {
    private tempFavList: string[] = [];
    private tempPlayedList: string[] = [];
    // checkExistingGame(id) {

    //     return this.tempFavList.indexOf(id) > -1;
    // }
    // checkPlayExistingGame(id) {
    //     return this.tempPlayedList.indexOf(id) > -1;
    // }
    addToFavorites(id) {
        this.tempFavList.push(id);
    }
    addToPlayed(id) {
        this.tempPlayedList.push(id);
    }
    removeFromFavorites(id) {

        this.tempFavList.splice(this.tempFavList.indexOf(id), 1)
    }
    removeFromPlayed(id) {
        this.tempPlayedList.splice(this.tempFavList.indexOf(id), 1)
    }

    checkExistingGame(id, favStatus: favoriteStatus) : boolean {

        if (favStatus === favoriteStatus.favorite)
            return this.tempFavList.indexOf(id) > -1;
        else
            return this.tempPlayedList.indexOf(id) > -1;
    }
}