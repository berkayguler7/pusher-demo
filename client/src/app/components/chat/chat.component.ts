import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import env from '../../../environments/environment';
import { PusherService } from '../../services/pusher.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  messages: string[] = [];
  newMessage: string = '';

  constructor(private http: HttpClient, private pusherService: PusherService) {}

  ngOnInit(): void {
    this.pusherService.subscribeToChannel('chat', 'message', (data: { user: string; message: string }) => {
      this.messages.push(`${data.user}: ${data.message}`);
      this.scrollToBottom();
    })

    const accessToken = document.cookie
      .split(';')
      .find((cookie) => cookie.includes('accessToken'))
      ?.split('=')[1] as string;

    if (!accessToken) {
      window.location.href = '/page/login';
    }
  }

  sendMessage() {
    this.pusherService.sendMessage(this.newMessage.trim());
    this.newMessage = '';
  }

  scrollToBottom() {
    setTimeout(() => {
      const chatWindow = document.getElementById('chat-window');
      if (chatWindow) chatWindow.scrollTop = chatWindow.scrollHeight;
    });
  }
}
