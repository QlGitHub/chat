import { UserProvider } from './../../providers/user/user';
import { ThreadsPage } from './../threads/threads';
import { RegisterPage } from './../register/register';
import { AuthProvider } from './../../providers/auth/auth';
import { Component, OnInit } from '@angular/core';
import {
  NavController, LoadingController,
  AlertController, Loading
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  submitAttempt: boolean = false;
  loading: Loading;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;

  test: any;

  constructor(private navCtrl: NavController, private userProvider: UserProvider,
    private authProvider: AuthProvider, public alertCtr: AlertController,
    public loadingCtr: LoadingController, public formbuilder: FormBuilder) {
  }

  ngOnInit(): void {
    let EMAIL_REGEXP =
      /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.loginForm = this.formbuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern(EMAIL_REGEXP)])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.required])]
    });
  }

  register(): void {
    this.navCtrl.push(RegisterPage);
  }

  elementChanged(input): void {
    if (input && input.inputControl) {
      let field = input.inputControl.name;
      this[field + 'Changed'] = true;
    }
  }

  loginWithEmail(): void {
    this.submitAttempt = true;
    if (this.loginForm.valid) {
      this.authProvider
        .signInWithEmail$(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe((data) => {
          this.navCtrl.setRoot(ThreadsPage);
        }, (error) => {
          if (error) {
            // TODO: refactor promise with Observable
            this.loading.dismiss().then(() => {
              let alert = this.alertCtr.create({
                message: error,
                buttons: [{
                  text: "OK",
                  role: 'cancel'
                }]
              });
              alert.present();
            })
          }
        });

      this.loading = this.loadingCtr.create({
        dismissOnPageChange: true
      });
      this.loading.present();
    }
  }

  loginwithGoogle(): void {
    this.authProvider.signInWithGoogle$()
      .switchMap(user => this.userProvider.saveUser$(user))
      .subscribe(() => {
        this.navCtrl.setRoot(ThreadsPage);
      });
  }
}
