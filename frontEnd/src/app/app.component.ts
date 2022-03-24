import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "./services/auth.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontEnd';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  cerrarSesion() {
    this.auth.logout();
    this.router.navigate(['login']);
  }
}
