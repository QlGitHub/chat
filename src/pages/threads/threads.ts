import { FriendsModel } from './../../models/friends.model';
import { FriendModel } from './../../models/friend.model';
import { FriendProvider } from './../../providers/friend/friend';
import { ThreadProvider } from './../../providers/thread/thread';
import { ThreadModel } from './../../models/thread.model';
import { LoginPage } from './../login/login';
import { AuthProvider } from './../../providers/auth/auth';
import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

@Component({
  selector: 'page-threads',
  templateUrl: 'threads.html'
})
export class ThreadsPage implements OnInit {
  loading: Loading;
  threads: ThreadModel[];
  participants: FriendsModel;
  userId: string;

  constructor(public navCtrl: NavController, private authProvider: AuthProvider,
    private loadingCtrl: LoadingController, private threadProvider: ThreadProvider,
    private friendProvider: FriendProvider) { }

  ngOnInit(): void {
    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true
    });

    // TODO: use switchMap since loading.dismiss() and navCtrl.push()
    // are both async
    this.authProvider.isAuthenticated$().subscribe(success => {
      if (success) {
        this.loading.dismiss();
      } else {
        this.navCtrl.push(LoginPage);
      }
    });

    this.authProvider.getUserAuthData$()
      .switchMap(user => {
        if (user && user.uid) {
          this.userId = user.uid;
          return this.threadProvider.getAllThreads$(user.uid);
        } else {
          return Observable.of([]);
        }
      }).switchMap(threads => {
        this.threads = threads;
        return this.friendProvider.getFriends$(this.userId);
      }).subscribe((friends: FriendsModel) => {
        let participants = {};
        this.threads.forEach(thread => {
          if (friends[thread.participantId]) {
            participants[thread.participantId] = friends[thread.participantId];
          }
        });
        this.participants = new FriendsModel({ ...participants });
      });
  };

  isItemShown(thread: ThreadModel): boolean {
    return !!thread && !!this.participants && !!this.participants[thread.participantId];
  }
}