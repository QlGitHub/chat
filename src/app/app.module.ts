import { MessagesPage } from './../pages/messages/messages';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MomentModule } from 'angular2-moment';
import { ElasticModule } from 'ng-elastic';

import { MyApp } from './app.component';
import { MePage } from '../pages/me/me';
import { FriendsPage } from '../pages/friends/friends';
import { ThreadsPage } from '../pages/threads/threads';
import { TabsPage } from '../pages/tabs/tabs';
import { RegisterPage } from './../pages/register/register';
import { LoginPage } from './../pages/login/login';
import { FriendSearchPage } from './../pages/friend-search/friend-search';

import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';
import { FriendProvider } from '../providers/friend/friend';
import { RandomProvider } from '../providers/random/random';
import { HttpModule } from '@angular/http';

import { FirebaseConfig } from "../environments/environment";
import { ThreadProvider } from '../providers/thread/thread';
import { MessageProvider } from '../providers/message/message';
import { ChatBubbleComponent } from '../components/chat-bubble/chat-bubble';

@NgModule({
  declarations: [
    MyApp,
    MePage,
    FriendsPage,
    ThreadsPage,
    TabsPage,
    LoginPage,
    RegisterPage,
    FriendSearchPage,
    MessagesPage,
    ChatBubbleComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FirebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MomentModule,
    ElasticModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MePage,
    FriendsPage,
    ThreadsPage,
    TabsPage,
    LoginPage,
    RegisterPage,
    FriendSearchPage,
    MessagesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    UserProvider,
    UserProvider,
    FriendProvider,
    RandomProvider,
    ThreadProvider,
    MessageProvider
  ]
})
export class AppModule { }
