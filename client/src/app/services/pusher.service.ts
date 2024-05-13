import { Injectable } from '@angular/core';
import Pusher, { Channel } from 'pusher-js';
import env from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PusherService {
  private pusher: Pusher;
  private channel: Channel | undefined;

  constructor(private http: HttpClient) {
    this.pusher = new Pusher(env.pusherAppKey, {
      cluster: env.pusherAppCluster
    });
  }

  subscribeToChannel(channelName: string, eventName: string, callback: Function) {
    this.channel = this.pusher.subscribe(channelName);
    this.channel.bind(eventName, callback);
  }

  sendMessage(message: string) {
    if (message !== '') {
      const accessToken = localStorage.getItem('accessToken') as string;

      if (!accessToken) {
        window.location.href = '/login';
      }

      let context = this.http.post(
          env.apiURL + '/message',
          { message },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: accessToken,
            },
            withCredentials: true,
          },
        ).subscribe();
    }
  }
}
