import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { FormGroup } from '@angular/forms';  
import { FirestoreService } from 'src/app/core/services/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  authPasswordError: any;

  constructor(public firestoreService: FirestoreService) {
  }

  userNameValidator(userControl: AbstractControl) { 
    return new Promise(resolve => {  
      setTimeout(() => {  
        if (this.firestoreService.checkUsername(userControl.value)) {  
          resolve({ taken: true });  
        } else {  
          resolve(null);  
        }  
      }, 500);  
    });  
  }  

  MatchPassword(password: string, confirmPassword: string) {  
    return (formGroup: FormGroup) => {  
      const passwordControl = formGroup.controls[password];  
      const confirmPasswordControl = formGroup.controls[confirmPassword];  
  
      if (!passwordControl || !confirmPasswordControl) {  
        return null;  
      }  
  
      if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {  
        return null;  
      }  
  
      if (passwordControl.value !== confirmPasswordControl.value) {  
        confirmPasswordControl.setErrors({ passwordMismatch: true });  
      } else {  
        confirmPasswordControl.setErrors(null);  
      }  
    }  
  }

  wrongPassword(control: AbstractControl){
    // if (this.authPasswordError){
    //   return { wrongPassword: true}
    // } else {
    //   return null
    // }
    return new Promise(resolve => {  
      setTimeout(() => {  
        if (this.authPasswordError) {  
          resolve({ wrongPassword: true });  
        } else {  
          resolve(null);  
        }  
      }, 100);  
    });
  }

  setAuthPasswordError(param: string){
    this.authPasswordError = param;
  }

  

}
