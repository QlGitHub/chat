import { RandomProvider } from './../../providers/random/random';
import { UserModel } from './../../models/user.model';
import { UserProvider } from './../../providers/user/user';
import { ThreadsPage } from './../threads/threads';
import { Validators } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthProvider } from './../../providers/auth/auth';
import { Component, OnInit } from '@angular/core';
import {
  NavController, AlertController, LoadingController,
  Loading
} from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  usernameChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: Loading;

  constructor(private navCtrl: NavController, private authProvider: AuthProvider,
    private alertCtrl: AlertController, private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder, private userProvider: UserProvider,
    private randomProvider: RandomProvider) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: [
        '',
        Validators.compose([
          Validators.required, Validators.pattern(this.authProvider.emailRegExp)
        ])
      ],
      password: [
        '',
        Validators.compose([
          Validators.minLength(6), Validators.required
        ])
      ],
      username: [
        '',
        Validators.compose([
          Validators.required
        ])
      ]
    });
  }

  elementChanged(input): void {
    this[input.ngControl.name + 'Changed'] = true;
  }

  fakeRegister(): void {
    this.randomProvider.getUserProfiles$(3)
      .switchMap(profiles => {
        if (profiles && profiles.length > 0) {
          let registerReq = [];
          profiles.forEach(profile => {
            registerReq.push(this.registerHelper(profile));
          });
          return Observable.forkJoin(registerReq);
        } else {
          return Observable.of({});
        }
      }).subscribe(() => { });
  }

  registerHelper(params: any): Observable<any> {
    if (!params || !params.email || !params.password) {
      return Observable.of({});
    }

    return this.authProvider.signUp(params.email, params.password)
      .switchMap(user => {
        let newUser: UserModel = new UserModel({
          id: user.uid,
          username: params.username,
          email: params.email,
          avatar: params.avatar,
          firstName: params.firstName,
          lastName: params.lastName
        });
        return this.userProvider.saveUser$(newUser);
      });
  }

  doRegister(event, email, password, username) {
    this.submitAttempt = true;
    if (this.registerForm.valid) {
      const params = {
        email, password, username
      };
      this.registerHelper(params).subscribe(res => {
        this.navCtrl.setRoot(ThreadsPage);
      }, error => {
        let alert = this.alertCtrl.create({
          message: error,
          buttons: [{
            text: "OK",
            role: 'cancel'
          }]
        });
        alert.present();
        this.loading.dismiss();
      });

      // show loading spinner
      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true
      });
      this.loading.present();
    }
  }
}
