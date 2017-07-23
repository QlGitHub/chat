import { Observable } from 'rxjs/Observable';
import { FriendsModel } from './../../models/friends.model';
import { UserModel } from './../../models/user.model';
import { UserProvider } from './../../providers/user/user';
import { FriendProvider } from './../../providers/friend/friend';
import { AuthProvider } from './../../providers/auth/auth';
import { FriendModel } from './../../models/friend.model';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import 'rxjs/add/observable/of';

@Component({
  selector: 'page-friend-search',
  templateUrl: 'friend-search.html',
})
export class FriendSearchPage implements OnInit {
  results: FriendModel[];
  friends: FriendsModel;
  user: UserModel;
  loading: boolean;

  // TODO: might need to pass in user data into current page
  // might not need to talk to Firebase Authentication directly
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private authProvider: AuthProvider, private friendProvider: FriendProvider,
    private userProvider: UserProvider) {
    this.results = [];
    this.loading = true;
  }

  ngOnInit(): void {
    this.authProvider.getUserAuthData$()
      .map(({ uid }) => uid)
      .switchMap(res => {
        return this.userProvider.getUser$(res);
      }).switchMap(user => {
        this.user = user;
        if (user && user.id) {
          return this.friendProvider.getFriends$(user.id);
        } else {
          return Observable.of(new FriendsModel());
        }
      }).subscribe(friends => {
        this.friends = friends;
        this.loading = false;
      });
  }

  searchFriends(keyword: string): void {
    this.friendProvider.search$(keyword)
      .subscribe(res => {
        this.results = res;
      });
  }
  
  isExistingFriend(userId: string): boolean {
    return !!this.friends && !!this.friends[userId];
  }

  // allow adding friend only after getting user info
  // TODO: Use Subject to throttle and send multiple
  // friends to server at the same time
  addFriend(friend: FriendModel): void {
    this.friendProvider.addFriend$(this.user, friend)
      .subscribe(() => { });
  }
}
