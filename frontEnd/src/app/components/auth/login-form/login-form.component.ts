import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { AuthService } from "../../../services/auth.service";


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  providers: [
      AuthService
  ],
  animations: [
    trigger('enterState', [
        state('void', style({
            transform:'translateY(-100%)',
            opacity:0
        })),
        transition(':enter', [
            animate(300, style({
                transform: 'translateY(0)',
                opacity:1
            }))
        ])
    ])
]
})
export class LoginFormComponent {

    public loginForm: FormGroup;
    @Output() errors;

    constructor(
        public authService: AuthService, 
        public router: Router
    ) {
        this.errors = new EventEmitter<string>();

        this.loginForm = new FormGroup({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
        })

    }

    //Login
    public login() {
        var user = this.loginForm.value;
        if (user.username && user.password){
            this.authService.login(user.username, user.password)
            .subscribe({
                next: resultado => {
                    if (resultado.type){
                        this.router.navigate(['']); 
                        console.log("todo ok");                   
                    }else 
                        this.errors.emit (`${resultado.data}`);                    
                },
                error: error => {
                    this.errors.emit ('Error de autenticación. ' + error);
                }
            });
        }
        else 
            this.errors.emit ("Introduce todos los datos.");   
    }
}
