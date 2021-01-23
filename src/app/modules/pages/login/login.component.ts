import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthProvider, Theme } from 'ngx-auth-firebaseui';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  providers = AuthProvider;
  themes = Theme;

  actionTab = "login"
  email: string;
  password: string;
  // "node_modules/bootstrap/dist/css/bootstrap.css",
  // "@ng-bootstrap/ng-bootstrap": "^9.0.1",
  // "bootstrap": "^4.5.0",

  constructor(
    private authenticationService: AuthenticationService, private router: Router, private afAuth: AngularFireAuth
  ) {
    console.log(authenticationService.userState)
  
  }

  ngOnInit(): void {
  }

  toggleTab(tab): void{
    this.actionTab = tab;
  }

  login(){
    this.authenticationService.signInWithEmail(this.email, this.password);
    this.email = '';
    this.password = '';
  }

  redirect(): void{
    this.router.navigate(['/'])
  }

}
