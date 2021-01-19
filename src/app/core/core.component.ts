import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-core-root',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent {
  constructor(public auth: AuthenticationService){}
  title = 'Husqr-Cale-Jake';
}
