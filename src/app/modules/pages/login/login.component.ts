import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthProvider, Theme } from 'ngx-auth-firebaseui';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  newUser: FormGroup;
  hide = true;
  // providers = AuthProvider;
  // themes = Theme;

  actionTab = "login"
  password: string;
  // password = new FormControl('', Validators.required);
  // newPassword = new FormControl('', [Validators.required, Validators.minLength(8)]);
  newPassword: string;
  username: string;
  // "node_modules/bootstrap/dist/css/bootstrap.css",
  // "@ng-bootstrap/ng-bootstrap": "^9.0.1",
  // "bootstrap": "^4.5.0",

  constructor(
    private authenticationService: AuthenticationService, 
    private router: Router, 
    private afAuth: AngularFireAuth,
    private fb: FormBuilder
  ) {
    console.log(authenticationService.userState)
    // this.newUser = this.fb.group({

    //   password: [undefined, [Validators.required]],
    //   confirmPassword: [undefined, 
    //           [
    //             Validators.required,
    //             this.matchValues('password'),
    //           ],
    //         ],
    //   });
  }

  ngOnInit(): void {
  }

  toggleTab(tab): void{
    this.actionTab = tab;
  }

  login(){
    this.authenticationService.signInWithEmail(this.email.value, this.password);
    // this.email.setValue = null;
    // this.password.setValue = null;
    // this.password = '';
  }

  register(){
    console.log(this.email.value, this.newPassword, this.username);
    this.authenticationService.register(this.email.value, this.newPassword, this.username)
  }

  redirect(): void{
    this.router.navigate(['/'])
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  //https://stackoverflow.com/questions/51605737/confirm-password-validation-in-angular-6
  matchValues(matchTo: string): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: false };
    };
}

}
