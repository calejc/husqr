import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { canActivate } from '@angular/fire/auth-guard';
import { environment } from '../../environments/environment';

import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from '../modules/pages/home/home.component';
import { FriendsComponent } from '../modules/pages/friends/friends.component';
import { ProfileComponent } from '../modules/pages/profile/profile.component';
import { HusqCardComponent } from '../modules/components/husq-card/husq-card.component';
import { HusqFormComponent } from '../modules/components/husq-form/husq-form.component';
import { LoginComponent } from '../modules/pages/login/login.component';

import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);
const redirectLoggedInToItems = () => redirectLoggedInTo(['/login']);


const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
  {path: 'home', component: HomeComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
  {path: 'friends', component: FriendsComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
  // {path: 'friends', component: FriendsComponent},
  {path: 'profile/:id', component: ProfileComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
  {path: 'login', component: LoginComponent}
  // {path: 'profile', redirectTo: 'home', component: HomeComponent}
];


@NgModule({
  declarations: [
    HomeComponent,
    FriendsComponent,
    ProfileComponent,
    HusqCardComponent,
    HusqFormComponent, 
    LoginComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    SharedModule, 
    NgxAuthFirebaseUIModule.forRoot(environment.firebase)
  ],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
