import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Note } from '../model/Note';
import { AuthService } from '../services/auth.service';
import { HapticsService } from '../services/haptics.service';
import { NoteService } from '../services/note.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {


  public startButton: boolean = false;
  public stopButton: boolean = true;
  public formNota: FormGroup;
  public miLoading: HTMLIonLoadingElement;
  public miToast: HTMLIonToastElement;

  constructor(private fb: FormBuilder, private noteService: NoteService, public loadingController: LoadingController, public toastController: ToastController,
    private authS:AuthService, private router:Router, private vib: HapticsService,) { }

  async ngOnInit() {
    // debe cargarse en el oninit
    this.formNota = this.fb.group({
      title: ["", Validators.required],
      description: [""]
    });

  }

  async presentLoading() {
    this.miLoading = await this.loadingController.create({
      message: '',
    });
    await this.miLoading.present();
  }

  async presentToast(msg: string, clr: string) {
    this.miToast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: clr
    });
    this.miToast.present();
  }

  public async addNote() {
    let newNote: Note = {
      title: this.formNota.get("title").value,
      description: this.formNota.get("description").value
    
      
    }
  
    await this.presentLoading();
    try {
      await this.noteService.addNote(newNote);
      await this.vib.vibrar();
      await this.presentToast("Nota agrageda Correctamente", "success");
      this.formNota.reset();
    } catch (error) {
      console.log(error);
      await this.presentToast("Ha ocurrido un error", "danger");
    } finally {
      //te ahorras el if -> se ejecuta solo si lo primero no es null o sease true
      this.miLoading && this.miLoading.dismiss();
    }

  }
  public async logout() {
    await this.authS.logout();
    this.router.navigate(['']);
  }
}