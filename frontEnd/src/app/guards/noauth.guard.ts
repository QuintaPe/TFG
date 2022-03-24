import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from "../services/auth.service"

@Injectable()
export class NoAuthGuard implements CanActivate {
    constructor(
        public router: Router,
        public authService: AuthService,
    ) { }

    canActivate() {
        if (this.authService.isUserAuth) 
            this.router.navigate(['/']);

        return !this.authService.isUserAuth;    
    }
}