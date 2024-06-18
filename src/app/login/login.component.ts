import { Component } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { LoginService } from './login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginService = inject(LoginService)

  filter$!: Observable<string | null>;
  action: string | null = 'login';

  loginError = "";
  registerError = "";

  constructor(
    private route: ActivatedRoute,
    private router : Router
  ) {}

  ngOnInit() {
    this.filter$ = this.route.queryParamMap.pipe(
      map((params: ParamMap) => params.get('action')),
    );
    this.filter$.subscribe(param => {
      if(param != null){this.action = param;}
    });

    this.loginService.isLogged(this.getCookie('session')).subscribe((response : any) => {
      if(response.status == 200) {
        this.router.navigate(['/users/dashboard']);
      }
    })
  }

  loginForm = new FormGroup({
    username_login: new FormControl('', [ Validators.required ]),
    password_login: new FormControl('', [ Validators.required ])
  });
  registerForm = new FormGroup({
    username: new FormControl('', [ Validators.required, Validators.minLength(3) ]),
    email: new FormControl('', [ Validators.required, Validators.email ]),
    password: new FormControl('', [ Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}') ]),
    password2: new FormControl('', [ Validators.required ]),
  });

  onLogin() {
    if(this.action == 'login') {
      const username: string = this.loginForm.value.username_login || '';
      const password: string = this.loginForm.value.password_login || '';

      this.loginService.login(username, password).subscribe((response : any) => {
        if(response.status == 200) {
          document.cookie = `session=${response.token}`;

          this.router.navigate(['/users/dashboard']);
        }
        else
        {
          this.loginError = response.message;
        }
      })
    }
    if(this.action == 'register') {
      const username: string = this.registerForm.value.username || '';
      const email: string = this.registerForm.value.email || '';
      const password: string = this.registerForm.value.password || '';
      const password2: string = this.registerForm.value.password2 || '';

      if(this.registerForm.valid) {
        this.loginService.register(username, email, password, password2).subscribe((response : any) => {
          if(response.status == 200) {
            this.router.navigate(['/login'], { queryParams: { action: 'login' } });
          }
          else
          {
            this.registerError = response.message;
          }
        })
      }
    }
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.registerForm.get(controlName);
    if (control && control.errors) {
      if (control.errors['required']) {
        return 'Ce champ est requis.';
      } else if (control.errors['minlength']) {
        return `Il faut au minimum ${control.errors['minlength'].requiredLength} caractères dans ce champ.`;
      } else if (control.errors['email']) {
        return 'Format de l\'email invalide.';
      } else if (control.errors['pattern']) {
        return 'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial';
      }
    }
    return null;
  }

  private getCookie(name: string) {
      let ca: Array<string> = document.cookie.split(';');
      let caLen: number = ca.length;
      let cookieName = `${name}=`;
      let c: string;

      for (let i: number = 0; i < caLen; i += 1) {
          c = ca[i].replace(/^\s+/g, '');
          if (c.indexOf(cookieName) == 0) {
              return Number(c.substring(cookieName.length, c.length));
          }
      }
      return 0;
  }
}
