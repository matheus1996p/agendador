import { Component, OnInit } from '@angular/core';
import {User} from "../../interfaces/user";
import {AuthService} from "../../services/auth.service";
import {LoadingController, ModalController, ToastController} from "@ionic/angular";
import {AngularFirestore} from "@angular/fire/firestore";
import {ApiService} from "../../services/api.service";
import {startWith} from "rxjs/operators";

@Component({
  selector: 'app-permissoes',
  templateUrl: './permissoes.page.html',
  styleUrls: ['./permissoes.page.scss'],
})
export class PermissoesPage implements OnInit {

  public usuarioLogado: User = {};
  public usuarios: any  = [];
  public step: number;
  private loading: any;
  admin: boolean;

  constructor(private authService: AuthService,
              private loadingCtrl: LoadingController,
              private afs: AngularFirestore,
              private modalCtrl: ModalController,
              private apiService: ApiService,
              private toastCtrl: ToastController) {
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.usuarios = [];
    this.listaUsuarios();
    this.getUsuarioLogado();
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }


  async getUsuarioLogado() {
    const user = await this.authService.getAuth().currentUser;

     this.afs.collection('Usuarios').doc(user.uid).
    valueChanges().subscribe(logado => {
      this.usuarioLogado = logado;
    });
  }

   async listaUsuarios(){
     await this.afs.collection('Usuarios')
      .valueChanges().pipe(startWith([])).subscribe(usuarios => {
        this.usuarios = [];
        usuarios.forEach(pessoa =>{
          this.usuarios.push(pessoa);
        });
      });
  }

  async register(ev, usuario) {
    await this.presentLoading();

    try {
      const newUser = Object.assign({}, usuario);
      delete newUser.senha;
      newUser.admin = ev.checked;
      await this.afs.collection('Usuarios').doc(usuario.uid).update(newUser);
    } catch (error) {
      let message: string;
      switch (error.code) {
        case 'auth/email-already-in-use':
          message = 'E-mail ja esta sendo utilizado!'
          break;
        case 'auth/invalid-email':
          message = 'E-mail inválido'
          break;
        default: message = error.message
      }

      console.error(error);
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

}
