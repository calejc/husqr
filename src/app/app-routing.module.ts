import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { HusqCardComponent } from './components/husq-card/husq-card.component';
import { ComposeComponent } from './components/compose/compose.component';
import { FriendsComponent } from './components/friends/friends.component';
import { ProfileComponent } from './components/profile/profile.component';
// import { HeaderComponent } from './components/header/header.component';
// import { PageComponent } from './components/page/page.component';
// import { FooterComponent } from './components/footer/footer.component';
// import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

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
    // HeaderComponent,
    HusqCardComponent
    // PageComponent,
    // FooterComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserAnimationsModule, 
    MatCardModule,
    MatButtonModule
    // MatToolbarModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
