import { Component, OnInit } from '@angular/core';
import {User} from "../../interfaces/user";
import {AuthService} from "../../services/auth.service";
import {LoadingController, ModalController, ToastController} from "@ionic/angular";
import {AngularFirestore} from "@angular/fire/firestore";
import {ApiService} from "../../services/api.service";
import {startWith, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";


interface Conf {
  id: string,
  descricao: string
}


@Component({
  selector: 'app-permissoes',
  templateUrl: './permissoes.page.html',
  styleUrls: ['./permissoes.page.scss'],
})
export class PermissoesPage implements OnInit {

  private ngUnsubscribe = new Subject();
  public usuarioLogado: User = {};
  public usuarios: any  = [];
  public listaNotaConf: any[];
  public listaPedConf: any[];
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
    this.carregaConfNotas();
    this.carregaConfPedidos();
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

  async carregaConfNotas(){
    try{
      await this.apiService.getListaConfNota().pipe(takeUntil(this.ngUnsubscribe)).subscribe((list: any[]) =>{
        this.listaNotaConf = list;
      })
    } catch (e) {
      console.log(e);
    }
  }
  async carregaConfPedidos(){
    try{
      await this.apiService.getListaConfPedidos().pipe(takeUntil(this.ngUnsubscribe)).subscribe((list: any[]) =>{
        this.listaPedConf = list;
      })
    } catch (e) {
      console.log(e);
    }
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

  async atualiza(usuario) {
    await this.presentLoading();

    try {
      const newUser = Object.assign({}, usuario);
      delete newUser.senha;
      newUser.admin = usuario.admin;
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
