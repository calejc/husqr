import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { FormGroup } from '@angular/forms';  
import { FirestoreService } from 'src/app/core/services/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {


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
      }, 1000);  
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

  matchValues(matchTo: string): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: false };
    };
  }
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const password = group.get('newPassword').value;
    const confirmPassword = group.get('confirmPassword').value;

    return password === confirmPassword ? null : { notSame: true }     
  }
  

  //   return (inputControl: AbstractControl): { [key: string]: boolean } | null => {
  //     if (inputControl.value !== undefined
  //       && inputControl.value.trim() != ""
  //       && inputControl.value !== otherInputControl.value) {
  //       return { 'mismatch': true };
  //     }

  //     return null;
  //   };
  // }
}
