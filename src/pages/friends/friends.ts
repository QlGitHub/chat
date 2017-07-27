import { MessagesPage } from './../messages/messages';
import { ThreadModel } from './../../models/thread.model';
import { ThreadProvider } from './../../providers/thread/thread';
import { RandomProvider } from './../../providers/random/random';
import { FriendModel } from './../../models/friend.model';
import { AuthProvider } from './../../providers/auth/auth';
import { FriendProvider } from './../../providers/friend/friend';
import { FriendSearchPage } from './../friend-search/friend-search';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import * as moment from 'moment';

@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html'
})
export class FriendsPage implements OnInit {
  friends: FriendModel[];
  userId: string;
  threads: ThreadModel[];

  constructor(private navCtrl: NavController, private friendProvider: FriendProvider,
    private authProvider: AuthProvider, private randomProvider: RandomProvider,
    private threadProvider: ThreadProvider) {
    this.userId = '';
    this.threads = [];
  }

  ngOnInit(): void {
    this.authProvider.getUserAuthData$()
      .switchMap(({ uid }) => {
        if (uid) {
          this.userId = uid;
          return this.friendProvider.getFriendsAsList$(uid);
        } else {
          return Observable.of([]);
        }
      }).switchMap((friends: FriendModel[]) => {
        this.friends = [...friends];
        if (!friends || friends.length == 0) {
          return Observable.of([]);
        }
        return this.threadProvider.getAllThreads$(this.userId);
      }).subscribe((threads: ThreadModel[]) => {
        this.threads = [...threads];
      });
  }

  addFriends(): void {
    this.navCtrl.push(FriendSearchPage);
  }

  startChat(friend: FriendModel) {
    let existingThreads = this.threads.filter(thread => {
      return (thread.ownerId === friend.id && thread.participantId === this.userId) ||
        (thread.participantId === friend.id && thread.ownerId === this.userId);
    });

    if (existingThreads && existingThreads.length > 0) {
      this.navCtrl.push(MessagesPage, {
        participant: { ...friend },
        threadId: existingThreads[0].id
      });
      return;
    }

    let timestamp: string = moment().format();
    let threadId = this.randomProvider.uuid(`thread-${this.userId}${friend.id}${timestamp}`);
    let requests = [];

    requests.push(this.threadProvider.updateThread$(this.userId,
      new ThreadModel({
        id: threadId,
        lastMsg: '',
        modifiedAt: timestamp,
        ownerId: this.userId,
        participantId: friend.id
      }))
    );

    requests.push(this.threadProvider.updateThread$(friend.id,
      new ThreadModel({
        id: threadId,
        lastMsg: '',
        modifiedAt: timestamp,
        ownerId: friend.id,
        participantId: this.userId
      }))
    );

    Observable.forkJoin(requests)
      .subscribe(() => {
        this.navCtrl.push(MessagesPage, {
          participant: { ...friend },
          threadId: threadId
        });
      });
  }
}
