import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ClassementComponent } from './classement/classement.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AuthGuard } from './auth.guard';
import { HistoriqueComponent } from './historique/historique.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'classement', component: ClassementComponent },
  { path: 'login', component: LoginComponent },
  { path: 'users/dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'users/historique', component: HistoriqueComponent, canActivate: [AuthGuard] },
  { path: 'users/chat', component: DiscussionComponent, canActivate: [AuthGuard] },
  { path: 'users/profil', component: ProfileComponent, canActivate: [AuthGuard] },

  { path: '**', pathMatch: 'full',  
      component: PagenotfoundComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
