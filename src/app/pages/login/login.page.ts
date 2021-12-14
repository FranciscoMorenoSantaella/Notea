import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { User } from '@codetrix-studio/capacitor-google-auth/dist/esm/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public userinfo:User;
  private isAndroid:boolean;
  public email:string;
  public password:string;
  public formInicio:FormGroup;
  user:any;
  userd:User;
  constructor(private platform:Platform,
    private authS:AuthService,
    private router:Router,private fb: FormBuilder, private af:AngularFireAuth) {
  }

  ngOnInit() {
    if(this.authS.isLogged()){
      this.router.navigate(['private/tabs/tab1']);
    }
  }

  ionViewWillEnter(){
    if(this.authS.isLogged){
      this.router.navigate(['private/tabs/tab1']);
    }
  }
  public async signin() {
    try {
      await this.authS.login();
      this.router.navigate(['private/tabs/tab1']);
    } catch (err) {
      console.error(err);
    }

  }


 
  public async logIn(email, password) {
    await this.authS.login2(email.value, password.value); 
    this.router.navigate(['private/tabs/tab1']);
  }

  public register(){
    this.router.navigate(['/register']);
  }

  /*public async loginWithEmail(email:string, password:string) {
    await this.authS.loginEmail(hola,hola); 
    this.router.navigate(['private/tabs/tab1']);
  }*/

 
}