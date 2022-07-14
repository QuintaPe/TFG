import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/auth/services/auth.service';
import { User } from '@app/user/models/user';
import { UserService } from '@app/user/services/user.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent implements OnInit {
  langs: string[] = [];
  user?: User;
  email='';
  name='';
  lastName=''
  birthDate='';

  constructor(
    public userService: UserService, 
    public authService: AuthService,
    public translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.langs = this.translate.getLangs();
    this.userService.getUser(this.authService.miId()).subscribe({
      next: (user) => {
        this.email = user.email;
        this.name = user.name;
        this.lastName = user.lastName;
        this.birthDate = user.birthDate;
      },
      error: (err) => console.log(err),
    });
  }

  changeLang = (lang: string) => {
    this.translate.use(lang);
  }
}
