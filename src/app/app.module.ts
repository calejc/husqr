import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HusqCardComponent } from './components/husq-card/husq-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageComponent } from './components/page/page.component';
import { HomeComponent } from './components/home/home.component';
import { ComposeComponent } from './components/compose/compose.component';
import { FriendsComponent } from './components/friends/friends.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HusqCardComponent,
    PageComponent,
    HomeComponent,
    ComposeComponent,
    FriendsComponent,
    ProfileComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
