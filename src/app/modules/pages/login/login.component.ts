import { Component, OnInit } from '@angular/core';
import { AuthProvider, Theme } from 'ngx-auth-firebaseui';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  providers = AuthProvider;
  themes = Theme;

  constructor() { }

  ngOnInit(): void {
  }

}
