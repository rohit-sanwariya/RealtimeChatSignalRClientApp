import { Component, EventEmitter, Input, Output, inject } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { DialogModule } from 'primeng/dialog'

@Component({
  selector: 'app-chat-room-form',
  templateUrl: './chat-room-form.component.html',
  styleUrl: './chat-room-form.component.scss',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    DialogModule,
  ]
})
export class ChatRoomFormComponent {
  @Input() show = false;
  @Output() onClose = new EventEmitter();
  private fb = inject(FormBuilder);
  chatForm = this.createChatForm();

  createChatForm(): FormGroup {
    return this.fb.group({

      username: [null, Validators.required],
      chatroom: [null, Validators.required],

    });
  }

  onSubmit(): void {
    this.onClose.emit(this.chatForm.value)
  }
}
