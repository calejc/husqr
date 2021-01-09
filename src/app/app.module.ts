import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
// import { HusqCardComponent } from './components/husq-card/husq-card.component';
// import { PageComponent } from './components/page/page.component';
// import { HomeComponent } from './components/home/home.component';
// import { ComposeComponent } from './components/compose/compose.component';
// import { FriendsComponent } from './components/friends/friends.component';
// import { ProfileComponent } from './components/profile/profile.component';
import { FooterComponent } from './components/footer/footer.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from "@angular/material/toolbar";
// import {MatCardModule} from '@angular/material/card';
// import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
    // HusqCardComponent
    // PageComponent,
    // HomeComponent,
    // ComposeComponent,
    // FriendsComponent,
    // ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule
    // BrowserAnimationsModule, 
    // MatCardModule,
    // MatButtonModule
  ],
  // entryComponents: [HusqCardComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
