import { Component, OnInit } from '@angular/core';
import {takeUntil} from "rxjs/operators";
import {AuthService} from "../../services/auth.service";
import {LoadingController, ModalController, NavController, ToastController} from "@ionic/angular";
import {AngularFirestore} from "@angular/fire/firestore";
import {ApiService} from "../../services/api.service";
import {Subject} from "rxjs";
import {User} from "../../interfaces/user";
import {TransfereService} from "../../services/transfere.service";
import {HomePage} from "../home/home.page";

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  private ngUnsubscribe = new Subject();
  public usuarioLogado: User = {};
  listaProdutos: any[];
  produtosSelecionados: any[] = [];

  constructor(private authService: AuthService,
              private navCtrl: NavController,
              private loadingCtrl: LoadingController,
              private afs: AngularFirestore,
              private modalCtrl: ModalController,
              private apiService: ApiService,
              private toastCtrl: ToastController,
              private transfereService:TransfereService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getUsuarioLogado();
  }

  voltar(){
    this.transfereService.setData(this.produtosSelecionados);
    this.navCtrl.navigateForward('/home');
  }

  async getUsuarioLogado() {
    let confNota = [];
    let confPed = [];
    let listConfNota = [];
    let listConfPed = [];

    const user = await this.authService.getAuth().currentUser;
    await this.afs.collection('Usuarios').doc(user.uid).
    valueChanges().pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      this.usuarioLogado = data;

      this.usuarioLogado.conf.forEach(conf =>{
        confNota.push(conf);
      });

      this.usuarioLogado.confped.forEach(confped =>{
        confPed.push(confped);
      });

      confNota.forEach(notaConf =>{
        listConfNota.push(notaConf.cod_conf);
      });

      confPed.forEach(pedConf =>{
        listConfPed.push(pedConf.cod_conf);
      });

      this.carregaPedidos(this.usuarioLogado.cpf, listConfNota.toString(), listConfPed.toString());
    });
  }

  async carregaPedidos(cpf, confNota, confPedido){
    try{
      await this.apiService.getVendaFutura(cpf.replaceAll('.', '').replaceAll('-',''), confNota, confPedido).pipe(takeUntil(this.ngUnsubscribe)).subscribe((produtos: any[]) =>{
        this.listaProdutos = produtos;
      })
    } catch (e) {
      console.log(e);
    }
  }

}
