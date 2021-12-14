import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Note } from 'src/app/model/Note';
import { HapticsService } from 'src/app/services/haptics.service';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-editmodal',
  templateUrl: './editmodal.page.html',
  styleUrls: ['./editmodal.page.scss'],
})
export class EditmodalPage implements OnInit {

 
  @Input() note:Note

  public formNota: FormGroup;
  startButton: boolean;
  stopButton: boolean;
  languages: any [];
  constructor(private modalController:ModalController,private noteS:NoteService, private fb: FormBuilder,  private vib:HapticsService) { }

  ngOnInit() {
    
    this.formNota = this.fb.group({
      title: ["", Validators.required],
      description: [""]
    });
  }
  

  public async editNote(){
    this.note.title=this.formNota.get("title").value;
    this.note.description=this.formNota.get("description").value;

    await this.noteS.editNote(this.note);

    this.closeModal();
    this.vib.vibrar();
  }

  public closeModal(){
    
    this.modalController.dismiss();
  }    
}
