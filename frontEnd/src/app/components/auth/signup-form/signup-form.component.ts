import {
  trigger,
  style,
  transition,
  animate,
  state,
} from '@angular/animations';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
  providers: [AuthService],
  animations: [
    trigger('enterState', [
      state(
        'void',
        style({
          transform: 'translateY(-100%)',
          opacity: 0,
        })
      ),
      transition(':enter', [
        animate(
          300,
          style({
            transform: 'translateY(0)',
            opacity: 1,
          })
        ),
      ]),
    ]),
  ],
})
export class SignupFormComponent {
  public page: boolean;
  @Output() errors;

  public registerForm: FormGroup;
  public registerForm2: FormGroup;

  mobNumberPattern = /^[679]{1}[0-9]{8}$/;
  emailPattern = /^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;

  constructor(public authService: AuthService, public router: Router) {
    this.page = false;
    this.errors = new EventEmitter<string>();

    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      birthDate: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(this.mobNumberPattern),
      ]),
    });

    this.registerForm2 = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.emailPattern),
      ]),
      password: new FormControl('', [Validators.required]),
      password2: new FormControl('', [Validators.required]),
    });
  }

  public signup() {
    var user = {
      ...this.registerForm.value,
      ...this.registerForm2.value,
      rol: 0,
    };
		console.log(user);

    this.authService.signup(user).subscribe({
      next: (resultado) => {
        if (resultado) this.router.navigate(['']);
        else this.errors.emit('El nombre de usuario ya esta en uso');
      },
      error: (error) => {
        console.log(error);
        this.errors.emit(`Error de registro. ${error}`);
      },
    });
  }

  next() {
    var err = '';
    if (this.registerForm.valid) this.page = true;
    else {
      const controls = this.registerForm.controls;
      for (const name in controls) {
        if (controls[name].invalid) err += name;
      }
      this.errors.emit(err);
    }
  }

  finish() {
    if (this.registerForm2.valid) this.signup();
    else {
      const controls = this.registerForm2.controls;
      for (const name in controls) {
        if (controls[name].invalid) this.authService.alertError = name;
      }
    }
  }
}
