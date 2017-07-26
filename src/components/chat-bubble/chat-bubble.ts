import { Component } from '@angular/core';

@Component({
  selector: 'chat-bubble',
  templateUrl: 'chat-bubble.html'
})
export class ChatBubbleComponent {

  msg = {
    content: 'Am I dreaming?',
    isMe: true,
    time: '12/3/2016',
    senderName: '12345',
    img: '../../assets/images/avatar-test.png',
    position: 'left'
  }

  constructor() {
  }

}
