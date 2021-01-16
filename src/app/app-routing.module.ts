import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './components/home/home.component';
import { HusqCardComponent } from './components/husq-card/husq-card.component';
import { HusqFormComponent } from './components/husq-form/husq-form.component';
import { FriendsComponent } from './components/friends/friends.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon'

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
    HusqFormComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserAnimationsModule, 
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule, 
    ReactiveFormsModule,
    MatDialogModule,
    MatExpansionModule, 
    MatIconModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
