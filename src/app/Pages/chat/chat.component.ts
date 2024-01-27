import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ChatRoomFormComponent } from "../../chat-room-form/chat-room-form.component";
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { SignalrService } from '../../Services/signalr.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-chat',
    standalone: true,
    templateUrl: './chat.component.html',
    styleUrl: './chat.component.scss',
    // changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ChatRoomFormComponent,
      MatButtonModule,MatCardModule,MatFormFieldModule,
      ReactiveFormsModule,MatInputModule,]
})
export default class ChatComponent {

  _signalR = inject(SignalrService);
  private _showDialog = false;
  public get showDialog() {
    return this._showDialog;
  }
  public set showDialog(value) {
    this._showDialog = value;
  }


  onSubmit({username,chatroom}:{username:string,chatroom:string}) {
    this._signalR.joinChatRoom(username,chatroom)
    this.showDialog = false;
  }
  messageSubmit(event:KeyboardEvent,textarea: HTMLTextAreaElement) {
    if(event.key.toLowerCase() === "enter"){
      this._signalR.sendMessage( textarea.innerText);

    }
  
    }
  
}
