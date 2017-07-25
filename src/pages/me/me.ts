import { LoginPage } from './../login/login';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-me',
  templateUrl: 'me.html'
})
export class MePage {

  constructor(private navCtrl: NavController, private authProvider: AuthProvider) { }

  signOut(): void {
    this.authProvider.signOut()
      .subscribe(() => {
        this.navCtrl.setRoot(LoginPage);
      });
  }
}
