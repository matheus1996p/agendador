import { Component, OnInit } from '@angular/core';
import {User} from "../../interfaces/user";
import {AuthService} from "../../services/auth.service";
import {LoadingController, ModalController, ToastController} from "@ionic/angular";
import {AngularFirestore} from "@angular/fire/firestore";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-permissoes',
  templateUrl: './permissoes.page.html',
  styleUrls: ['./permissoes.page.scss'],
})
export class PermissoesPage implements OnInit {

  public usuarioLogado: User = {};
  public usuarios: any  = [];
  public step: number;

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
      this.usuarioLogado.senha = '123456';
    });
  }

   async listaUsuarios(){
    console.log(this.usuarios);
     await this.afs.collection('Usuarios')
      .valueChanges().subscribe(usuarios => {
        usuarios.forEach(pessoa =>{
          this.usuarios.push(pessoa);
        });
      });
  }

}
