export class ThreadModel {
  id: string;
  lastMsg: string;
  modifiedAt: string;
  ownerId: string;
  participantId: string;

  constructor(params: any) {
    this.id = '';
    this.lastMsg = '';
    this.modifiedAt = '';
    this.ownerId = '';
    this.participantId = '';

    if (params) {
      Object.keys(this).forEach(key => {
        if (params[key]) {
          this[key] = params[key];
        }
      });
    }
  }
}