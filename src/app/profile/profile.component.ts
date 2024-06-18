import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileService } from './profile.service';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  profileService = inject(ProfileService)
  userService = inject(UserService)

  username = "";
  userDescription = "";

  userId: number = 0;

  filter$!: Observable<string | null>;
  action: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.filter$ = this.route.queryParamMap.pipe(
      map((params: ParamMap) => params.get('action')),
    );
    this.filter$.subscribe(param => {
      if(param != null){this.action = param;}
    });

    this.userService.getUserData().subscribe((data: any) => {
      if(data.status == 200)
      {
        this.username = data.data.pseudonyme;
        this.userDescription = data.data.description;
        this.userId = data.data.id;
      }
    });
  }

  profileForm = new FormGroup({
    pseudonyme: new FormControl(this.username),
    description: new FormControl(this.userDescription)
  });

  onSubmit() {
    const pseudonyme: string = this.profileForm.value.pseudonyme || this.username;
    const description: string = this.profileForm.value.description || this.userDescription;

    this.profileService.updateProfile(this.userId, pseudonyme, description)
    .subscribe((data: any) => {
      if(data.status == 200)
      {
        window.location.href = 'users/profil'
      }
    });
  }

  onLogout() {
    const cookies = document.cookie.split(";");
  
    // Supprimer chaque cookie
    for (let cookie of cookies) {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }

    window.location.href = '/'
  }
}
