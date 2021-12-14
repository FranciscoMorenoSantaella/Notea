import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { modalController } from '@ionic/core';
import { NoteService } from 'src/app/services/note.service';
import { Note } from 'src/app/model/Note';
import { UtilsService } from 'src/app/services/utils.service';
import { Tab1Page } from 'src/app/tab1/tab1.page';
import { HapticsService } from 'src/app/services/haptics.service';
@Component({
  selector: 'app-modals',
  templateUrl: './modals.page.html',
  styleUrls: ['./modals.page.scss'],
})
export class ModalsPage implements OnInit {
  public notas:Note[]=[];
  private miLoading:HTMLIonLoadingElement;
  @Input() nota:any;

  constructor(private modalcontroller: ModalController,private ns:NoteService,private loadingcontroller:LoadingController,tab1:Tab1Page,  private vib:HapticsService) { }

  ngOnInit() {
  }

 

  async closeModal(){
    await this.modalcontroller.dismiss();
  }

  public async borrar(){
    console.log(this.nota)
    await this.presentLoading();
    await this.ns.remove(this.nota.key);
    let i=this.notas.indexOf(this.nota,0);
    if(i>-1){
      this.notas.splice(i,1);
    }
    await this.miLoading.dismiss();
    await this.vib.vibrar();
    await this.closeModal();
  
  }
  async presentLoading() {
    this.miLoading = await this.loadingcontroller.create({
      message: '',
    });
    await this.miLoading.present();
  }

}
