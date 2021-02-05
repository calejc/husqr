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

  login: FormGroup;
  register: FormGroup;
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
    this.login= this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
    this.register = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.minLength(3)], this.validationService.userNameValidator.bind(this.validationService)),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required])
    },{validator: this.validationService.MatchPassword('password', 'confirmPassword')}
    );
  }

  loginWithEmail(){
    if (this.login.valid){
      let res = this.authenticationService.signInWithEmail(this.login.get('email').value, this.login.get('password').value);
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

  registerWithEmail(){
    if (this.register.valid){
      this.firestoreService.create({
        item: this.register.controls.username.value,
        ref: this.firestoreService.collectionRefs.usernamesRef
      })
      let options = {
        email: this.register.controls.email.value,
        password: this.register.controls.password.value,
        username: this.register.controls.username.value
      }
      let res = this.authenticationService.register(options)
      res.then((err) => {
        if (err === "auth/email-already-in-use"){
          this.emailInUse = "Email already in use"
        }
      })
    }
  }

  redirect(): void{
    this.router.navigate(['/'])
  }




  // ---------------------- //
  // --  Error Messages  -- //
  // ---------------------- //
  getEmailErrorMessage(formGroup: FormGroup) {
    if (formGroup.get("email").hasError('required')) {
      return 'You must enter a value';
    }
    return formGroup.get("email").hasError('email') ? 'Not a valid email' : '';
  }


  getUsernameErrorMessage(){
    if (this.register.get('username').hasError('minlength')){
      return "Must be at least 3 characters"
    } else if (this.register.get("username").hasError('required')){
      return "You must enter a value";
    }
    return this.register.get("username").hasError("taken") ? 'Username already taken' : '';
  }

  getLoginPasswordErrorMessage(){
    if (this.login.controls.password.hasError("required")){
      return "Please enter password"
    } 
    return this.login.controls.password.hasError('wrongPassword') ? "Incorrect password" : '';
  }

  getRegistrationPasswordErrorMessage(){
    if (this.register.get('password').hasError('minlength')){
      return "Must be at least 6 characters"
    } else if (this.register.get('password').hasError('required')){
      return "Please enter password"
    } 
    return "Passwords must match"
  }


}
