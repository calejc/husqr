import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TimelineService } from './services/timeline.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatToolbarModule } from "@angular/material/toolbar";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule
  ],
  providers: [TimelineService],
  bootstrap: [AppComponent]
})
export class AppModule { }
