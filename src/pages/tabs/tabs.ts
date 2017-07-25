import { Component } from '@angular/core';

import { MePage } from '../me/me';
import { FriendsPage } from '../friends/friends';
import { ThreadsPage } from '../threads/threads';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ThreadsPage;
  tab2Root = FriendsPage;
  tab3Root = MePage;

  constructor() { }
}
