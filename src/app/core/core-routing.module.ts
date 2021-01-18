import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from 'src/app/modules/pages/home/home.component';
import { FriendsComponent } from 'src/app/modules/pages/friends/friends.component';
import { ProfileComponent } from 'src/app/modules/pages/profile/profile.component';
import { HusqCardComponent } from '../modules/components/husq-card/husq-card.component';
import { HusqFormComponent } from '../modules/components/husq-form/husq-form.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'friends', component: FriendsComponent},
  // {path: 'profile', redirectTo: 'home', component: HomeComponent},
  {path: 'profile/:id', component: ProfileComponent}
];


@NgModule({
  declarations: [
    HomeComponent,
    FriendsComponent,
    ProfileComponent,
    HusqCardComponent,
    HusqFormComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    SharedModule
  ],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
