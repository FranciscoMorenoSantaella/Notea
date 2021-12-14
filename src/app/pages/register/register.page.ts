import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private autS:AuthService, private route:Router) { }

  ngOnInit() {
  }


  public async singUp(email,password){
    try{
    const user = await this.autS.register(email.value,password.value);
    console.log(user);
    if(user){
      console.log(user);
      await this.autS.keepSession();

    }
    }catch(error){
      console.log(error);
    }
  }

  public async goToLogin(){
    this.route.navigate(['']);
  }
}
