import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HusqrComponent } from './components/husqr/husqr.component';
import { HeaderComponent } from './components/header/header.component';
import { HusqCardComponent } from './components/husq-card/husq-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HusqrComponent,
    HeaderComponent,
    HusqCardComponent
  ],
  imports: [
    BrowserModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
