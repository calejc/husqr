import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(
    public dialog: MatDialog, 
    public auth: AuthenticationService ) { 
      // const config = new MatDialogConfig();
      // config.autoFocus = true;
      // const dialogRef = this.dialog.open(LoginComponent, config);
      // dialogRef.afterClosed().subscribe(result => {
      //   console.log(result);
      // })
      // do actions here?
    }

  ngOnInit(): void {
    // const config = new MatDialogConfig();
    //   config.autoFocus = true;
    //   config.disableClose = true;
    //   const dialogRef = this.dialog.open(LoginComponent, config);
    //   dialogRef.afterClosed().subscribe(result => {
    //     console.log(result);
    //   })
  }

}
