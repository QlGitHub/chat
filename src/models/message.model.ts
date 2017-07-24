export class MessageModel {
  id: string;
  createdAt: string;
  ownerId: string;
  threadId: string;
  content: string;

  constructor(params: any) {
    this.id = '';
    this.createdAt = '';
    this.ownerId = '';
    this.threadId = '';
    this.content = '';

    if (params) {
      Object.keys(this).forEach(prop => {
        if (params[prop]) {
          this[prop] = params[prop];
        }
      });
    }
  }
}