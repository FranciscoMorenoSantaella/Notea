import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private miLoading:HTMLIonLoadingElement;
  load: any;
  
  constructor(loading:LoadingController) { }

  presentLoading() {
    this.load.create({
        message: ''
    }).then((response) => {
        response.present();
    });
}

dimissLoading() {
  this.miLoading.dismiss().then((response) => {
      console.log('Loader closed!', response);
  }).catch((err) => {
      console.log('Error occured : ', err);
  });
}
}
