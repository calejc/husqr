import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';
// import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

import { CoreComponent } from './core.component';
import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { AuthenticationService } from '../core/services/authentication.service';


@NgModule({
  declarations: [
    CoreComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    CoreRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    SharedModule
    // NgxAuthFirebaseUIModule.forRoot(environment.firebase)
  ],
  providers: [AuthenticationService],
  bootstrap: [CoreComponent]
})
export class CoreModule { }
