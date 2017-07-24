import { Observable } from 'rxjs/Observable';
import { MessageModel } from './../../models/message.model';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class MessageProvider {

  constructor(private afDb: AngularFireDatabase) { }

  createMessage$(threadId: string, message: MessageModel): Observable<any> {
    return Observable.fromPromise(
      this.afDb.object(`/Messages/${threadId}/${message.id}`).update(message));
  }

  getAllMessages$(threadId: string) {
    return this.afDb.list(`/Messages/${threadId}`);
  }
}
