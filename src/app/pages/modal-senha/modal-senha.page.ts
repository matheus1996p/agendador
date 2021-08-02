import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-modal-senha',
  templateUrl: './modal-senha.page.html',
  styleUrls: ['./modal-senha.page.scss'],
})
export class ModalSenhaPage implements OnInit {

  resetSenha = {senhaAtual: '', novaSenha: '', confirmeSenha: ''};

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  fecharModal() {
    this.modalCtrl.dismiss();
  }

}
