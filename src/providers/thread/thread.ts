import { Observable } from 'rxjs/Observable';
import { ThreadModel } from './../../models/thread.model';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFireDatabase } from "angularfire2/database";
@Injectable()
export class ThreadProvider {

  constructor(private afDb: AngularFireDatabase) { }

  updateThread$(ownerId: string, thread: ThreadModel): Observable<any> {
    if (!ownerId || !thread) {
      return Observable.of({});
    }

    return Observable.fromPromise(
      this.afDb.object(`/Threads/${ownerId}/${thread.id}`).update(thread));
  }

  // find all threads given an owner id
  getAllThreads$(ownerId: string): Observable<ThreadModel[]> {
    if (!ownerId) {
      return Observable.of([]);
    }

    return this.afDb.list(`/Threads/${ownerId}`)
      .map(res => {
        let threads = [];
        if (res && res.length > 0) {
          res.forEach(elem => {
            threads.push(new ThreadModel(elem));
          });
        }
        return threads;
      });
  }
}
