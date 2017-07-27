import { Component, Input } from '@angular/core';

@Component({
  selector: 'chat-bubble',
  templateUrl: 'chat-bubble.html'
})
export class ChatBubbleComponent {

  @Input() content: string;
  @Input() position: string;
  @Input() time: string;
  @Input() name: string;
  @Input() avatar: string;

  constructor() { }
}
