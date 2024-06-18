import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  user = inject(UserService);

  wins: number = 0;
  looses: number = 0;
  points: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.user.getUserData().subscribe((data: any) => {
      if(data.status == 200)
      {
        this.user.getUserWins(data.data.id).subscribe((data2: any) => {
          if(data2.status == 200)
          {
            this.wins = data2.wins;
          }
        });
        this.user.getUserLooses(data.data.id).subscribe((data2: any) => {
          if(data2.status == 200)
          {
            this.looses = data2.looses;
          }
        });
        this.points = data.data.points;
      }
    });
  }

}
