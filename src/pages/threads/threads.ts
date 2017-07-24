import { LoginPage } from './../login/login';
import { AuthProvider } from './../../providers/auth/auth';
import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-threads',
  templateUrl: 'threads.html'
})
export class ThreadsPage implements OnInit {
  loading: Loading;

  constructor(public navCtrl: NavController, private authProvider: AuthProvider,
    private loadingCtrl: LoadingController) { }

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