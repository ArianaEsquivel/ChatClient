import { Component, OnInit } from '@angular/core';
import Ws from "@adonisjs/websocket-client"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ChatClient';
  ws: any;
  chat: any;
  messages: string[] = [];
  msg: string;

  ngOnInit(): void {
    this.ws = Ws("ws://localhost:3333", {
      path: "ws"
    });

    this.ws.connect();
    this.chat = this.ws.subscribe("chat");

    this.chat.on("message", (data: any) => {
      this.messages.push(data);
    });
  }

  sendMessage(): void {
    this.chat.emit("message", this.msg);
    this.messages.push(this.msg);
    this.msg = ""; 
  }
}
