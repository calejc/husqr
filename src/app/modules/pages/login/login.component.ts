import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthProvider, Theme } from 'ngx-auth-firebaseui';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ValidationService } from '../../../shared/services/validation.service';
import { FirestoreService } from 'src/app/core/services/firestore.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  auth: FormGroup;
  usernames: any;
  username: any;
  hide = true;

  constructor(
    private authenticationService: AuthenticationService, 
    private router: Router, 
    public firestoreService: FirestoreService,
    private afAuth: AngularFireAuth,
    private fb: FormBuilder,
    public validationService: ValidationService
  ) {
    // this.auth = this.fb.group({
    //   email: new FormControl('', [Validators.required, Validators.email]),
    //   password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    //   newEmail: new FormControl('', [Validators.required, Validators.email]),
    //   newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    //   confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    //   // username: new FormControl('', [Validators.required, validationService.takenUsernameValidation()])
    // },
    // {  
    //   validator: this.validationService.MatchPassword('password', 'confirmPassword'),  
    // }
    // );
  }

  ngOnInit(): void {
    this.firestoreService.observableDatabase.Usernames$.subscribe((uname: any) => {
      this.usernames = (uname.id)
      console.log(this.usernames)
    })
    this.auth = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      newEmail: new FormControl('', [Validators.required, Validators.email]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required], this.validationService.userNameValidator.bind(this.validationService))
    },
    {  
      validator: this.validationService.MatchPassword('newPassword', 'confirmPassword')
    }
    );
    // this.setValidators();
  }

  login(){
    this.authenticationService.signInWithEmail(this.auth.get('email').value, this.auth.get('password').value);
    // this.email.setValue = null;
    // this.password.setValue = null;
    // this.password = '';
  }

  register(){
    // console.log(this.newEmail.value, this.newPassword, this.username.value);
    // this.authenticationService.register(this.newEmail.value, this.newPassword.value, this.username.value)
  }

  redirect(): void{
    this.router.navigate(['/'])
  }




  // ---------------------- //
  // --  Error Messages  -- //
  // ---------------------- //
  getEmailErrorMessage() {
    if (this.auth.get("email").hasError('required')) {
      return 'You must enter a value';
    }
    return this.auth.get("email").hasError('email') ? 'Not a valid email' : '';
  }


  getUsernameErrorMessage(){
    console.log("ERROR", this.auth.get('username').errors)
    if (this.auth.get("username").hasError('required')){
      return "You must enter a value";
    }
    return this.auth.get("username").hasError("taken") ? 'Username already taken' : '';
  }

  getPasswordErrorMessage(){
    if (this.auth.get('password').hasError('minLength') || this.auth.get('newPassword').hasError('minLength')){
      return "Must be at least 8 characters"
    }
    else if (this.auth.get('newPassword').hasError('required') || this.auth.get('password').hasError('required')){
      return "Please enter password"
    } 
    return "Passwords must match"
  }


}
