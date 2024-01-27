import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private _hubConnection!: HubConnection;
  username = '';
  chatRoom = '';

  messageInput = new FormControl<string>("");
  messages: Array<{ username: string, message: string }> = [];


  async joinChatRoom(username: string, chatRoom: string) {
    try {
      this._hubConnection = new HubConnectionBuilder()
        .configureLogging(LogLevel.Information)
        .withUrl("https://localhost:7181/Chat")
        .build();

      this._hubConnection.on("JoinSpecificChatRoom",
        (username, msg) => {
          console.log("msg: ", username, msg);

        });
      await this._hubConnection.start();
      this._hubConnection.on("Message Received", (username, message) => {
        this.messages.push({ username, message })
        this.username = !this.username ? username : this.username;
        this.chatRoom = chatRoom;
        console.log(message);
      })
      this._hubConnection.on("ReceivedSpecificMessage", (username, message) => {
        this.messages.push({ username, message });
        this.messageInput.setValue("");
      })
      console.log("connected......")
      await this._hubConnection.invoke("JoinSpecificChatRoom", { UserName: username, ChatRoom: chatRoom });


    } catch (error) {
      console.log(error);
    }
  }

  async sendMessage(message: string) {
    await this._hubConnection.invoke("SendMessage", this.messageInput.value)
  }
}
