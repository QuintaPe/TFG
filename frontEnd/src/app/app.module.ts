import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AuthService } from './services/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { SignupFormComponent } from './components/auth/signup-form/signup-form.component';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';
import { AuthGuard } from './guards/auth.guard';
import { JwtModule } from '@auth0/angular-jwt';
import { NoAuthGuard } from './guards/noauth.guard';

// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function tokenGetter() {
	return localStorage.getItem("access_token");
}
export const createTranslateLoader = (http: HttpClient) => {
  return new TranslateHttpLoader(http, './i18n/', '.json');
}

@NgModule({
	declarations: [
		AppComponent,
		AuthComponent,
		NavBarComponent,
		HomeComponent,
		UserComponent,
		SignupFormComponent,
		LoginFormComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		RouterModule,
		AppRoutingModule,
		JwtModule.forRoot({
			config: {
			  tokenGetter: tokenGetter,
			  allowedDomains: ["localhost:4200"],
			  disallowedRoutes: [""],
			},
		}),
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
			}
		})
	],
	providers: [
		AuthService, 
		AuthGuard,
		NoAuthGuard
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
