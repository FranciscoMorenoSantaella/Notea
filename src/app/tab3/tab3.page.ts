import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  Camera,
  CameraResultType,
  CameraSource,
  ImageOptions,
  Photo,
} from '@capacitor/camera';
import { IonToggle } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../services/auth.service';
import { LocalstorageService } from '../services/localstorage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  @ViewChild('miToggle',{static:false}) miToggle:IonToggle;
  public image: any;

  constructor(
    private traductor: TranslateService,
    private authS: AuthService,
    private router: Router,
    private storage: LocalstorageService
  ) {
    traductor.setDefaultLang("es");
    traductor.get("PHOTOS").toPromise().then(data=>{
      console.log(data);
    })
  }

  ionViewDidEnter() {
    const lang = this.traductor.getDefaultLang();
    if (lang == 'es') {
      this.miToggle.checked = false;
    } else {
      this.miToggle.checked = true;
    }
  }

  public async cargaIdioma(event){
    if(event && event.detail && event.detail.checked){
      await this.storage.setItem('lang',{lang:'en'});
      this.traductor.use('en');
    }else{
      await this.storage.setItem('lang',{lang:'es'});
      this.traductor.use('es');
    }
  }

  public async hazFoto() {
    let options: ImageOptions = {
      resultType: CameraResultType.Uri,
      allowEditing: false,
      quality: 90,
      source: CameraSource.Camera,
    };

    let result: Photo = await Camera.getPhoto(options);
    this.image = result.webPath;
  }
  public async logout() {
    await this.authS.logout();
    this.router.navigate(['']);
  }


}
