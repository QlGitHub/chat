import { FriendModel } from './friend.model';

export class FriendsModel {
  [friendId: string]: FriendModel;

  constructor(params?: any) {
    if (!params) {
      return;
    }
    
    let keys = Object.keys(params);
    if (keys && keys.length) {
      keys.forEach(key => {
        this[key] = new FriendModel(params[key]);
      });
    }
  }
}