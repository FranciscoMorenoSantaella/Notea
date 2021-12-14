import { KeepAwake } from '@capacitor-community/keep-awake';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class KeepawakeService {
  /**
   * Este metodo hace que la pantalla no se pueda suspender
   */
  async keepAwake() {
    await KeepAwake.keepAwake();
  }
  /**
   * Este metodo permite que la pantalla se pueda suspender
   */
  async allowSleep() {
    await KeepAwake.allowSleep();
  }

  constructor() {}
}
