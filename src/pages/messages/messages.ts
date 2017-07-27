import { ThreadModel } from './../../models/thread.model';
import { ThreadProvider } from './../../providers/thread/thread';
import { RandomProvider } from './../../providers/random/random';
import { FriendModel } from './../../models/friend.model';
import { MessageModel } from './../../models/message.model';
import { UserModel } from './../../models/user.model';
import { UserProvider } from './../../providers/user/user';
import { AuthProvider } from './../../providers/auth/auth';
import { MessageProvider } from './../../providers/message/message';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage implements OnInit, AfterViewInit {
  user: UserModel;
  participant: FriendModel;
  threadId: string;
  messages: MessageModel[];
  message: string;

  @ViewChild('msgList') msgList: any;

  constructor(private navCtrl: NavController, private navParams: NavParams,
    private msgProvider: MessageProvider, private authProvider: AuthProvider,
    private userProvider: UserProvider, private randomProvider: RandomProvider,
    private threadProvider: ThreadProvider) {
  }

  ngOnInit(): void {
    this.authProvider.getUserAuthData$()
      .switchMap(res => {
        if (res && res.uid) {
          return this.userProvider.getUser$(res.uid);
        } else {
          return Observable.of({});
        }
      }).switchMap((user: UserModel) => {
        if (!user || !user.id) {
          return Observable.of([]);
        }
        this.user = user;
        this.participant = new FriendModel(this.navParams.get('participant'));
        this.threadId = this.navParams.get('threadId');
        return this.msgProvider.getAllMessages$(this.threadId);
      }).subscribe((messages: MessageModel[]) => {
        this.messages = messages;
      });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.msgList.scrollToBottom(400);
    }, 200);
  }

  sendMessage(): void {
    let timestamp: string = moment().format();
    let messageId: string = this.randomProvider.uuid(
      `${this.user.id}${this.participant.id}${timestamp}`);

    let requests = [];

    requests.push(this.msgProvider.createMessage$(this.threadId,
      new MessageModel({
        id: messageId,
        createdAt: timestamp,
        ownerId: this.user.id,
        threadId: this.threadId,
        content: this.message
      }))
    );

    requests.push(this.threadProvider.updateThread$(this.user.id,
      new ThreadModel({
        id: this.threadId,
        lastMsg: this.message,
        modifiedAt: timestamp,
        ownerId: this.user.id,
        participantId: this.participant.id
      }))
    );

    requests.push(this.threadProvider.updateThread$(this.participant.id,
      new ThreadModel({
        id: this.threadId,
        lastMsg: this.message,
        modifiedAt: timestamp,
        ownerId: this.participant.id,
        participantId: this.user.id
      }))
    );

    Observable.forkJoin(requests)
      .subscribe(() => {
        this.message = '';
        this.msgList.scrollToBottom(300);
      });
  }

  isParticipant(message: MessageModel): boolean {
    return message.ownerId === this.participant.id;
  }
}
