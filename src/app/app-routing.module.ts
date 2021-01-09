import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './components/home/home.component';
import { HusqCardComponent } from './components/husq-card/husq-card.component';
import { ComposeComponent } from './components/compose/compose.component';
import { FriendsComponent } from './components/friends/friends.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'compose', component: ComposeComponent},
  {path: 'friends', component: FriendsComponent},
  {path: 'profile', component: ProfileComponent}
];


@NgModule({
  declarations: [
    HomeComponent,
    ComposeComponent,
    FriendsComponent,
    ProfileComponent,
    HusqCardComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserAnimationsModule, 
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
