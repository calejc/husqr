import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from "@angular/material/toolbar";


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
    MatToolbarModule
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
    MatToolbarModule
  ]
})
export class SharedModule { }
