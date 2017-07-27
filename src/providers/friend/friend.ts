import { AuthProvider } from './../auth/auth';
import { FriendsModel } from './../../models/friends.model';
import { UserModel } from './../../models/user.model';

import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from "rxjs/Observable";
import { FriendModel } from "../../models/friend.model";

@Injectable()
export class FriendProvider {

  constructor(private afDb: AngularFireDatabase,
    private authProvider: AuthProvider) { }

  search$(keyword: string): Observable<any> {
    if (!keyword) {
      return Observable.of([]);
    }
    
    return this.authProvider.isAuthenticated$()
      .switchMap(success => {
        if (success) {
          return this.afDb.list('/Users', {
            query: {
              orderByChild: 'email',
              startAt: keyword,
              endAt: `${keyword}\uf8ff`,
            }
          });
        } else {
          return Observable.of([]);
        }
      }).map(users => {
        let friends = [];
        if (users && users.length > 0) {
          users.forEach(({ id, username, email, avatar, firstName, lastName }) => {
            friends.push(new FriendModel({
              id, username, email, avatar, firstName, lastName
            }));
          });
        }
        return friends;
      });
  }

  addFriend$(user: UserModel, friend: FriendModel): Observable<any> {
    if (!user || !friend) {
      return Observable.of({});
    }
    
    return this.authProvider.isAuthenticated$()
      .switchMap(success => {
        if (success) {
          return Observable.fromPromise(
            this.afDb.object(`Friends/${user.id}/${friend.id}`).update(friend).then(
              () => this.afDb.object(`Friends/${friend.id}/${user.id}`).update(new FriendModel(user))
            ));
        } else {
          return Observable.of({});
        }
      });
  }

  getFriends$(userId: string): Observable<FriendsModel> {
    return this.authProvider.isAuthenticated$()
      .switchMap(success => {
        if (success) {
          return this.afDb.object(`Friends/${userId}`)
            .map(res => new FriendsModel(res));
        } else {
          return Observable.of(new FriendsModel());
        }
      });
  }

  getFriendsAsList$(userId: string): Observable<FriendModel[]> {
    return this.authProvider.isAuthenticated$()
      .switchMap(success => {
        if (success) {
          return this.afDb.list(`Friends/${userId}`);
        } else {
          return Observable.of([]);
        }
      }).map(res => {
        let friends = [];
        if (res && res.length > 0) {
          res.forEach(({ id, username, email, avatar, firstName, lastName }) => {
            friends.push(new FriendModel({
              id, username, email, avatar, firstName, lastName
            }));
          });
        }
        return friends;
      });
  }
}
