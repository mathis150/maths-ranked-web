import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  user = inject(UserService);

  actualRoute = window.location.pathname;

  primalHeader: boolean = true;

  username = "";

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    if(this.actualRoute != '/' && this.actualRoute != '/about' && this.actualRoute != '/classement' && this.actualRoute != '/login') {
      this.user.getUserData().subscribe((data: any) => {
        if(data.status == 200)
        {
          this.username = data.data.pseudonyme;
        }
      });
      this.primalHeader = false;
    }
  }
}
