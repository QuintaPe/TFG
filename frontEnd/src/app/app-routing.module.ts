import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/noauth.guard';
import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './components/auth/auth.component';
import { UserComponent } from './components/user/user.component';



const routes: Routes = [
  { path: ''      , component: HomeComponent, canActivate: [AuthGuard]  },
  { path: 'login' , component: AuthComponent, canActivate: [NoAuthGuard]},
  { path: 'signup', component: AuthComponent, canActivate: [NoAuthGuard]},
  { path: 'users' , component: UserComponent, canActivate: [AuthGuard]  }  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {  }