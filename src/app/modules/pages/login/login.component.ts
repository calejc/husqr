import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthProvider, Theme } from 'ngx-auth-firebaseui';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ValidationService } from '../../../shared/services/validation.service';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  auth: FormGroup;
  hide = true; // toggling boolean for hide/show password button
  badCredentials: any; // display a sepearate mat-error upon wrong password during sign in
  emailInUse: any; // display a separate mat-error if email is already in use

  constructor(
    private authenticationService: AuthenticationService, 
    private router: Router, 
    public firestoreService: FirestoreService,
    private afAuth: AngularFireAuth,
    private fb: FormBuilder,
    public validationService: ValidationService,
    private snackBar: MatSnackBar
  ) {  }

  ngOnInit(): void {
    this.auth = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      newEmail: new FormControl('', [Validators.required, Validators.email]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required, Validators.minLength(3)], this.validationService.userNameValidator.bind(this.validationService))
    },
    {  
      validator: this.validationService.MatchPassword('newPassword', 'confirmPassword')
    }
    );
  }

  login(){
    if (this.auth.valid){
      let res = this.authenticationService.signInWithEmail(this.auth.get('email').value, this.auth.get('password').value);
    res.then((err) => {
      if (err === "auth/wrong-password" || err === "auth/user-not-found"){
        this.badCredentials = "Bad credentials"
        setTimeout(()=>{
          this.badCredentials = null 
        }, 1000)
       }
      })
    }
  }

  openSnackBar(message: string, action: string, config: any){
    this.snackBar.open(message, action, config)
  }

  register(){
    this.firestoreService.create({
      item: this.auth.controls.username.value,
      ref: this.firestoreService.collectionRefs.usernamesRef
    })
    let options = {
      email: this.auth.controls.newEmail.value,
      password: this.auth.controls.newPassword.value,
      username: this.auth.controls.username.value
    }
    let res = this.authenticationService.register(options)
    res.then((err) => {
      if (err === "auth/email-already-in-use"){
        this.emailInUse = "Email already in use"
      }
    })
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
    if (this.auth.get('username').hasError('minlength')){
      return "Must be at least 3 characters"
    } else if (this.auth.get("username").hasError('required')){
      return "You must enter a value";
    }
    return this.auth.get("username").hasError("taken") ? 'Username already taken' : '';
  }

  getPasswordErrorMessage(){
    if (this.auth.controls.password.hasError("required")){
      return "Please enter password"
    } 
    return this.auth.controls.password.hasError('wrongPassword') ? "Incorrect password" : '';
  }

  getRegistrationPasswordErrorMessage(){
    if (this.auth.get('newPassword').hasError('minlength')){
      return "Must be at least 8 characters"
    } else if (this.auth.get('newPassword').hasError('required')){
      return "Please enter password"
    } 
    return "Passwords must match"
  }


}
