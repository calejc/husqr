import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTabsModule } from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import {MatChipsModule} from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule, 
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule, 
    ReactiveFormsModule,
    MatDialogModule,
    MatExpansionModule, 
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatTabsModule,
    MatChipsModule,
    MatDividerModule
    MatSnackBarModule
  ], 
  exports: [
    BrowserAnimationsModule, 
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule, 
    ReactiveFormsModule,
    MatDialogModule,
    MatExpansionModule, 
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatTabsModule,
    MatChipsModule,
    MatDividerModule
    MatSnackBarModule
  ]
})
export class SharedModule { }
