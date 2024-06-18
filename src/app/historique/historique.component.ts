import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrl: './historique.component.scss'
})
export class HistoriqueComponent {
  user = inject(UserService);

  list: any = [];
  userId = 0;

  constructor() { }

  ngOnInit(): void {
    this.user.getUserData().subscribe((data: any) => {
      if(data.status == 200)
      {
        this.userId = data.data.id;
        this.user.getUserBattles(data.data.id).subscribe((data2: any) => {
          if(data2.status == 200)
          {
            this.list = data2.data;
          }
        });
      }
    });
  }
}
