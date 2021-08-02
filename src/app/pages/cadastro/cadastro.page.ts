import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {AngularFirestore} from "@angular/fire/firestore";
import {User} from "../../interfaces/user";
import firebase from "firebase";
import AuthCredential = firebase.auth.AuthCredential;
import EmailAuthProvider = firebase.auth.EmailAuthProvider;
import {LoadingController, ModalController, ToastController} from "@ionic/angular";
import {ModalSenhaPage} from "../modal-senha/modal-senha.page";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  public usuarioLogado: User = {};
  public usuarioSincronizado = false;
  public usuarios = new Array<User>();

  private loading: any;

  constructor(private authService: AuthService,
              private loadingCtrl: LoadingController,
              private afs: AngularFirestore,
              private modalCtrl: ModalController,
              private apiService: ApiService,
              private toastCtrl: ToastController) {
    this.getUsuarioLogado();

  }

  ngOnInit() {
  }

  verificaCPF(){
    this.usuarios.forEach(usuario =>{
      if(usuario.cpf === this.usuarioLogado.cpf){
        this.usuarioSincronizado = true;
      }
    });
  }

   async verificaSincronizacao(){
    await this.afs.collection('Usuarios Sincronizados')
      .valueChanges().subscribe(data => {
        data.forEach(pessoa =>{
          this.usuarios.push(pessoa);
        });
        this.verificaCPF();
      });
  }

   async getPessoa(){
       this.apiService.getPessoa(this.usuarioLogado.cpf).subscribe(pessoa =>{
         console.log('Usuario sincronizado:');
         console.log(pessoa);
         this.sincronizaUsuario();
       });
  }

  async sincronizaUsuario() {
    await this.presentLoading();

    try {
      await this.afs.collection('Usuarios Sincronizados').add(this.usuarioLogado);
    } catch (error) {
      let message: string;
      switch (error.code) {
        default: message = error.message;
      }

      this.presentToast(message);
    } finally {
      this.loading.dismiss();
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Por favor, aguarde...'
    });
    return this.loading.present();

  }

  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  async abrirModal(){
      const modal = await this.modalCtrl.create({
        component: ModalSenhaPage,
        cssClass: 'my-custom-modal-css'
      });

      modal.present();
  }

  async getUsuarioLogado() {
    const user = await this.authService.getAuth().currentUser;

    await this.afs.collection('Users').doc(user.uid).
    valueChanges().subscribe(data => {
      this.usuarioLogado = data;
      this.usuarioLogado.senha = '123456';
      this.verificaSincronizacao();
    });
  }

}
