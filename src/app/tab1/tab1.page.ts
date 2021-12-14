import { Component, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import {
  AlertController,
  IonInfiniteScroll,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { toastController } from '@ionic/core';
import { Note } from '../model/Note';
import { NoteService } from '../services/note.service';
import { ModalController } from '@ionic/angular';
//Cargamos la página modal
import { User } from '@codetrix-studio/capacitor-google-auth/dist/esm/user';
import { ModalsPage } from '../pages/modals/modals.page';
import { EditmodalPage } from '../pages/modals/editmodal/editmodal.page';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HapticsService } from '../services/haptics.service';
import { KeepawakeService } from '../services/keepawake.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  public notas: Note[] = [];
  public miLoading: HTMLIonLoadingElement;
  public formInicio: FormGroup;
  User: User;
  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;
  constructor(
    private ns: NoteService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private modalC: ModalController,
    public alertController: AlertController,
    private authS: AuthService,
    private router: Router,
    private vib: HapticsService,
    private keepa: KeepawakeService
  ) {}

  async ionViewDidEnter() {
    await this.cargaNotas();
    await this.keepa.keepAwake();
  }

  public async cargaNotas(event?) {
    if (this.infinite.disabled) {
    }
    if (!event) {
      await this.presentLoading();
    }
    this.notas = [];
    try {
      this.notas = await this.ns.getNotesByPage('algo').toPromise();
      if (this.notas.length < 10) {
        this.infinite.disabled = true;
      }
    } catch (err) {
      console.error(err);
      await this.presentToast('Error cargando datos', 'danger');
    } finally {
      if (event) {
        event.target.complete();
      } else {
        await this.miLoading.dismiss();
      }
    }
  }

  //////////////////////////////////////////////////
  //Hacer estos metodos en el servicio
  /**
   * Metodo que elimina una nota con un ion-alert y llama a la funcion eliminarNota si el usuario acepta
   * @param nota que se va a eliminar
   */

  async presentDeleteModal(nota: Note) {
    console.log(nota);
    if (nota) {
      const modal = await this.modalC.create({
        component: ModalsPage,
        cssClass: 'my-custom-class',
        componentProps: {
          nota: nota,
        },
      });
      await modal.present();
    } else {
      console.error('La nota no esta definida');
    }
  }

  public async borra(nota:Note){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmación', 
      subHeader: 'Borrado de nota ' + nota.title,
      message: 'Estas apunto de borrar la nota: ',
      buttons: [ {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: async () => {
          await this.miLoading.dismiss();
        }
      }, {
        text: 'Aceptar',
        handler: async () => {
          await this.ns.remove(nota.key);
          let i = this.notas.indexOf(nota,0);
          if(i>-1){
            this.notas.splice(i,1);
          }
          await this.miLoading.dismiss();
        }
      }]
    });
    await alert.present();
  }

  async presentEditModal(nota: Note) {
    const modal = await this.modalC.create({
      component: EditmodalPage,
      cssClass: 'my-custom-class',
      componentProps: {
        note: nota,
      },
    });
    return await modal.present();
  }

  async presentLoading() {
    this.miLoading = await this.loadingController.create({
      message: '',
    });
    await this.miLoading.present();
  }

  async presentToast(msg: string, clr: string) {
    const miToast = await toastController.create({
      message: msg,
      duration: 2000,
      color: clr,
    });
    miToast.present();
  }
  public async cargaInfinita($event) {
    console.log('CARGAND');
    let nuevasNotas = await this.ns.getNotesByPage().toPromise();
    if (nuevasNotas.length < 5) {
      $event.target.disabled = true;
    }
    this.notas = this.notas.concat(nuevasNotas);
    $event.target.complete();
  }

  public async logout() {
    await this.authS.logout();
    this.router.navigate(['']);
  }

  //searchbar para buscar notas
  public buscarNotas($event) {
    const texto = $event.target.value;
    if (texto.length > 0) {
      this.notas = this.notas.filter((note) => {
        return note.title.toLowerCase().indexOf(texto.toLowerCase()) > -1;
      });
    } else {
      this.cargaNotas();
    }
  }
}
