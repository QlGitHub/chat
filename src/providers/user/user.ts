import { AuthProvider } from './../auth/auth';
import { UserModel } from './../../models/user.model';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';

import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class UserProvider {

  constructor(private afDb: AngularFireDatabase,
    private authProvider: AuthProvider) { }

  saveUser$(user: UserModel): Observable<any> {
    return this.authProvider.isAuthenticated$()
      .switchMap((success: boolean) => {
        if (success) {
          return Observable.fromPromise(this.afDb.object(`/Users/${user.id}`).update(user));
        } else {
          return Observable.of(null);
        }
      });
  }

  getUser$(userId: string): Observable<UserModel> {
    return this.authProvider.isAuthenticated$()
      .switchMap(success => {
        if (success) {
          return this.afDb.object(`/Users/${userId}`)
        } else {
          return Observable.of({});
        }
      }).map(res => new UserModel(res));
  }
}
