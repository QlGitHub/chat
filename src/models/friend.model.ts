export class FriendModel {
  id: string;
  username: string;
  email?: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;

  constructor(params: any) {
    this.id = '';
    this.username = '';
    this.email = '';
    this.avatar = '';
    this.firstName = '';
    this.lastName = '';

    if (!params) {
      return;
    }
    
    Object.keys(this).forEach(prop => {
      if (params[prop]) {
        this[prop] = params[prop];
      }
    });
  }
}
