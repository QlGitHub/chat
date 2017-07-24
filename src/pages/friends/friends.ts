import { FriendModel } from './../../models/friend.model';
import { AuthProvider } from './../../providers/auth/auth';
import { FriendProvider } from './../../providers/friend/friend';
import { FriendSearchPage } from './../friend-search/friend-search';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html'
})
export class FriendsPage implements OnInit {
  friends: FriendModel[];

  constructor(private navCtrl: NavController, private friendProvider: FriendProvider,
    private authProvider: AuthProvider) { }

  ngOnInit(): void {
    this.authProvider.getUserAuthData$()
      .switchMap(({ uid }) => {
        if (uid) {
          return this.friendProvider.getFriendsAsList$(uid);
        } else {
          return Observable.of([]);
        }
      }).subscribe(friends => this.friends = friends);
  }

  addFriends(): void {
    this.navCtrl.push(FriendSearchPage);
  }
}
