import { LoginPage } from './../login/login';
import { AuthProvider } from './../../providers/auth/auth';
import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, Loading, LoadingOptions } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  loading: Loading;

  constructor(public navCtrl: NavController, private afDB: AngularFireDatabase,
    private authProvider: AuthProvider, private loadingCtrl: LoadingController) { }

  ngOnInit(): void {
    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true
    });

    // TODO: use switchMap since loading.dismiss() is async
    this.authProvider.isAuthenticated$().subscribe(success => {
      if (success) {
        this.loading.dismiss();
      } else {
        this.navCtrl.push(LoginPage);
      }
    });
  }

  signOut(): void {
    this.authProvider.signOut();
  }
}