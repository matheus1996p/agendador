import { Component, OnInit } from '@angular/core';
import {takeUntil} from "rxjs/operators";
import {AuthService} from "../../services/auth.service";
import {LoadingController, ModalController, ToastController} from "@ionic/angular";
import {AngularFirestore} from "@angular/fire/firestore";
import {ApiService} from "../../services/api.service";
import {Subject} from "rxjs";
import {User} from "../../interfaces/user";

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  private ngUnsubscribe = new Subject();
  public usuarioLogado: User = {};
  listaProdutos: any[];

  sourceProducts: any[] = [];

  produtosSelecionados: any[] = [];

  constructor(private authService: AuthService,
              private loadingCtrl: LoadingController,
              private afs: AngularFirestore,
              private modalCtrl: ModalController,
              private apiService: ApiService,
              private toastCtrl: ToastController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getUsuarioLogado();
  }

  async getUsuarioLogado() {
    const user = await this.authService.getAuth().currentUser;
    await this.afs.collection('Usuarios').doc(user.uid).
    valueChanges().pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      this.usuarioLogado = data;
      this.carregaPedidos(this.usuarioLogado.cpf);
    });
  }

  async carregaPedidos(cpf){
    try{
      await this.apiService.getVendaFutura(cpf.replaceAll('.', '').replaceAll('-','')).pipe(takeUntil(this.ngUnsubscribe)).subscribe((produtos: any[]) =>{
        this.listaProdutos = produtos;
        this.sourceProducts = produtos;
      })
    } catch (e) {
      console.log(e);
    }
  }

}
