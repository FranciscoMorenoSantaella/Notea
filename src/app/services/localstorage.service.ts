import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  constructor(){}

  /**
   * 
   * @param key 
   * @param value 
   * @returns 
   */
  public async setItem(key: string, value: any): Promise<boolean> {
    let result: boolean = false;
    try {
      await Storage.set({
        key: key,
        value: JSON.stringify(value),
      });
      result = true;
    } catch (err) {
      console.error(err);
    }
    return Promise.resolve(result);
  }
  /**
   * 
   * @param key le pasa un string 
   * @returns 
   */
  public async getItem(key: string): Promise<any> {
    let value = null;
    try {
      value = await Storage.get({ key: key });
      value = value.value;
      if (value != null) {
        value = JSON.parse(value);
      }
    } catch (err) {
      console.error(err);
    }
    return Promise.resolve(value);
  }
  /**
   * 
   * @param key 
   * @returns 
   */
  public async removeItem(key: string): Promise<boolean> {
    let result = false;
    try {
      await Storage.remove({ key: key });
      result = true;
    } catch (err) {
      console.error(err);
    }
    return Promise.resolve(result);
  }
}