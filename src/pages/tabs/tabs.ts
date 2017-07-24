import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { FriendsPage } from '../friends/friends';
import { ThreadsPage } from '../threads/threads';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ThreadsPage;
  tab2Root = FriendsPage;
  tab3Root = AboutPage;

  constructor() { }
}
