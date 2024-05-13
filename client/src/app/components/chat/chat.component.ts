import { Component, OnInit } from '@angular/core';
import { PusherService } from '../../services/pusher.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  messages: string[] = [];
  newMessage: string = '';

  constructor(private pusherService: PusherService, private authService: AuthService) {}

  ngOnInit(): void {
    this.pusherService.subscribeToChannel('chat', 'message', (data: { user: string; message: string }) => {
      this.messages.push(`${data.user}: ${data.message}`);
      this.scrollToBottom();
    })

    const accessToken = localStorage.getItem('accessToken') as string;

    if (!accessToken) {
      window.location.href = '/login';
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

  logout() {
    this.authService.logout();
    window.location.href = '/login';
  }
}
