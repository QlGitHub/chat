import { UserModel } from './../../models/user.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthProvider {
  private _emailRegExp: RegExp =
  /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

  constructor(private afAuth: AngularFireAuth) { }

  get emailRegExp(): RegExp {
    return this._emailRegExp;
  }

  isAuthenticated$(): Observable<boolean> {
    return this.afAuth.authState.map(user => !!user);
  }

  getUserAuthData$(): Observable<any> {
    return this.afAuth.authState.map(user => user ? user : {});
  }

  signInWithEmail$(email: string, password: string): Observable<any> {
    return Observable.fromPromise(this.afAuth.auth.
      signInWithEmailAndPassword(email, password));
  }

  signInWithGoogle$(): Observable<UserModel> {
    return Observable.fromPromise(<Promise<any>>this.afAuth.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider()))
      .map(res => {
        console.log(res);
        return new UserModel({
          email: res.user.email,
          id: res.user.uid,
          username: res.user.email.split('@')[0],
          firstName: res.additionalUserInfo.profile.given_name,
          lastName: res.additionalUserInfo.profile.family_name,
          avatar: res.additionalUserInfo.profile.picture
        });
      });
  }

  signOut(): Observable<any> {
    return Observable.fromPromise(
      this.afAuth.auth.signOut());
  }

  signUp(email: string, password: string): Observable<any> {
    return Observable.fromPromise(
      this.afAuth.auth.createUserWithEmailAndPassword(email, password));
  }
}
