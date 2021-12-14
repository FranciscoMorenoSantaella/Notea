import { Injectable } from '@angular/core';

import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { User } from '@codetrix-studio/capacitor-google-auth/dist/esm/user';
import { LocalstorageService } from './localstorage.service';
import { Platform } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private afauth:AngularFireAuth;
  public user:any;
  private isAndroid=false;
  private email:any;
  private password:any;

  constructor(private storage:LocalstorageService,
    private platform:Platform, private af:AngularFireAuth) {
    this.isAndroid=platform.is("android");
    if(!this.isAndroid)
      GoogleAuth.init(); //lee la config clientid del meta de index.html
   }
  public test(){
    //SecureStoragePlugin.set();
    //const message, nonce, path, privateKey; // ...
    //const hashDigest = sha256(nonce + message);
    //const hmacDigest = Base64.stringify(hmacSHA512(path + hashDigest, privateKey));
  }

  public async loadSession(){
    let user= await this.storage.getItem('user');
    if(user){
      user=JSON.parse(user);
      this.user=user;
    }
  }
  public async login(){
    let user:User = await GoogleAuth.signIn();
    this.user=user;
    await this.keepSession();
  }

  public async register(email:string,password:string){
    try {
      const {user} = await this.af.createUserWithEmailAndPassword(email,password);
      return user;
    } catch (error) {
      console.log("Error al registrar usuario ---> "+error);
    }
  }
  public async logout(){
    await GoogleAuth.signOut();
    await this.storage.removeItem('user');
    this.user=null;
  }
  public async keepSession(){
    await this.storage.setItem('user',JSON.stringify(this.user));
  }
  public isLogged():boolean{
    if(this.user) return true; else return false;
  }

  public async registerEmail(email:string,password:string){
    return await this.afauth.createUserWithEmailAndPassword(email,password);
  }

  public async login2(email:string,password:string):Promise<any>{
    try {
      const {user} = await this.af.signInWithEmailAndPassword(email,password);
      this.user=user;
      await this.keepSession();
      return user;
    } catch (error) {
      console.log("Error al iniciar sesion ---> "+error);
    }
  }



  
}