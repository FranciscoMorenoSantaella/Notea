import { Injectable } from '@angular/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
@Injectable({
  providedIn: 'root'
})
export class HapticsService {

  constructor() { }
  /**
   * Esta función hace que el dispositivo vibre, con duración en ms
   * si quisiese que la vibración fuese diferente en cada botón sería tan facil
   * como poner que le pasa un number y cambiarlo en el parametro duration.
   */
  async vibrar(){
    //Haptics.impact({style:ImpactStyle.Heavy})
     Haptics.vibrate({duration:700})
  }
}
