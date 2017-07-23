export class UserModel {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;

  constructor(user: any) {
    this.id = '';
    this.username = '';
    this.email = '';
    this.firstName = '';
    this.lastName = '';
    this.avatar = '';

    Object.keys(this).forEach(prop => {
      if (user[prop]) {
        this[prop] = user[prop];
      }
    });
  }
}