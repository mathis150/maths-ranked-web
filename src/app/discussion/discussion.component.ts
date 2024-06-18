import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DiscussionService } from './discussion.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrl: './discussion.component.scss'
})
export class DiscussionComponent {
  discussionService = inject(DiscussionService)
  userService = inject(UserService)

  userId = 0;
  userRank = 0;

  messages : any = [];

  constructor() { }

  ngOnInit(): void {
    this.userService.getUserData().subscribe((data: any) => {
      if(data.status == 200)
      {
        this.userId = data.data.id;
        this.userRank = data.data.rank;
      }
    });

    this.discussionService.getMessages().subscribe((data: any) => {
      if(data.status == 200)
      {
        this.messages = data.data;
      }
    });
  }

  chatForm = new FormGroup({
    message: new FormControl('', [ Validators.required ])
  });

  onSubmit() {
    const message: string = this.chatForm.value.message || '';

    this.discussionService.sendMessage(this.userId, message)
    .subscribe((data: any) => {
      if(data.status == 200)
      {
        console.log('Message sent successfully');
      }
    });
  }

  onDelete(id: number) {
    this.discussionService.deleteMessage(id)
  }
}
