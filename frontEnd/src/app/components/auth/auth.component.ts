import { Component} from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

//import { authGuard } from "../../guards/auth.guard";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    providers: [AuthService]
})


export class AuthComponent {
    private alert:boolean;
    private errors:string;

    constructor( private authService: AuthService, public router:Router) {
        this.alert = false;
        this.errors = "";
    }

    // Getters
    get getErrors(){
        return this.errors;
    }

    get getAlert(){
        return this.alert;
    }

    //Funciones para la alerta
    removeAlert(){
        this.alert = false;
        this.errors = "";
    }

    showAlert(e:string){
        this.alert = true;
        this.errors = e;
        setTimeout(() => {
            this.removeAlert(); 
          }, 5000);
    }  
}
