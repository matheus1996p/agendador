import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {AngularFirestore} from "@angular/fire/firestore";
import {User} from "../../interfaces/user";
import firebase from "firebase";
import AuthCredential = firebase.auth.AuthCredential;
import EmailAuthProvider = firebase.auth.EmailAuthProvider;

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  public usuarioLogado: User = {};

  constructor(private authService: AuthService,
              private afs: AngularFirestore) {
    this.getUsuarioLogado();
  }

  ngOnInit() {
  }

  async getUsuarioLogado() {
    const user = await this.authService.getAuth().currentUser;

    console.log(user);
    await this.afs.collection('Users').doc(user.uid).
    valueChanges().subscribe(data => {
      this.usuarioLogado = data;
      this.usuarioLogado.senha = '123456';
      console.log(this.usuarioLogado);
    });
  }

}
