import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Pusher from 'pusher-js';
import env from '../../../environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  apiURL = env.apiURL;
  messages: string[] = [];
  newMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const pusher = new Pusher(env.pusherAppKey, {
      cluster: env.pusherAppCluster,
    });

    const channel = pusher.subscribe('chat');

    channel.bind('message', (data: { user: string; message: string }) => {
      this.messages.push(`${data.user}: ${data.message}`);
      this.scrollToBottom();
    });

    const accessToken = document.cookie
      .split(';')
      .find((cookie) => cookie.includes('accessToken'))
      ?.split('=')[1] as string;

    if (!accessToken) {
      window.location.href = '/page/login';
    }
  }

  sendMessage() {
    console.log('sendMessage')
    const message = this.newMessage.trim();
    if (message !== '') {
      console.log('sendMessage', message)
      this.scrollToBottom();
      this.newMessage = '';

      const accessToken = document.cookie
        .split(';')
        .find((cookie) => cookie.includes('accessToken'))
        ?.split('=')[1] as string;

      console.log('sendMessage', accessToken)

      this.http.post(
          this.apiURL + '/message',
          { message },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: accessToken,
            },
            withCredentials: true,
          },
        )
        .subscribe();
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      const chatWindow = document.getElementById('chat-window');
      if (chatWindow) chatWindow.scrollTop = chatWindow.scrollHeight;
    });
  }
}
