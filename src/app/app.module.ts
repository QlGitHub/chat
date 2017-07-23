import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { FriendsPage } from '../pages/friends/friends';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { RegisterPage } from './../pages/register/register';
import { LoginPage } from './../pages/login/login';
import { FriendSearchPage } from './../pages/friend-search/friend-search';

import { AuthProvider } from '../providers/auth/auth';
import { ChatProvider } from '../providers/chat/chat';
import { UserProvider } from '../providers/user/user';
import { FriendProvider } from '../providers/friend/friend';
import { RandomProvider } from '../providers/random/random';
import { HttpModule } from '@angular/http';

import { FirebaseConfig } from "../environments/environment";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    FriendsPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    FriendSearchPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FirebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    FriendsPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    FriendSearchPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    ChatProvider,
    UserProvider,
    UserProvider,
    FriendProvider,
    RandomProvider
  ]
})
export class AppModule { }
