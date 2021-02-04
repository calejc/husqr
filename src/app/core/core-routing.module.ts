import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';

import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from '../modules/pages/home/home.component';
import { FriendsComponent } from '../modules/pages/friends/friends.component';
import { ProfileComponent } from '../modules/pages/profile/profile.component';
import { HusqCardComponent } from '../modules/components/husq-card/husq-card.component';
import { HusqFormComponent } from '../modules/components/husq-form/husq-form.component';
import { LoginComponent } from '../modules/pages/login/login.component';
import { ReplyComponent } from '../modules/components/reply/reply.component';
import { SettingsComponent } from '../modules/pages/settings/settings.component';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);
const redirectLoggedInToItems = () => redirectLoggedInTo(['/login']);


const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
  {path: 'home', component: HomeComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
  {path: 'friends', component: FriendsComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
  {path: 'profile', component: ProfileComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
  {path: 'login', component: LoginComponent},
  {path: 'settings', component: SettingsComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}}
];


@NgModule({
  declarations: [
    HomeComponent,
    FriendsComponent,
    ProfileComponent,
    HusqCardComponent,
    HusqFormComponent, 
    LoginComponent,
    SettingsComponent,
    ReplyComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    SharedModule, 
  ],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
