import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {PrimeNGConfig} from "primeng/api";
import {ApiService} from "../../services/api.service";
import {takeUntil} from "rxjs/operators";
import {User} from "../../interfaces/user";
import {AuthService} from "../../services/auth.service";
import {AngularFirestore} from "@angular/fire/firestore";

@Component({
  selector: 'app-minha-agenda',
  templateUrl: './minha-agenda.page.html',
  styleUrls: ['./minha-agenda.page.scss'],
})
export class MinhaAgendaPage implements OnInit {

  private ngUnsubscribe = new Subject();
  public usuarioLogado: User = {};

  date = new Date();

  public pedidos = new Array<any>();
  public listaPedidosDetalhes = new Array<any>();
  public pedidoExpandido = new Array<any>();

  quantidadeTotal = 0;
  valorTotal = 0;

  horaAtual = this.date.getHours() + ':' + this.date.getMinutes();

  public step: number;

  constructor(private config: PrimeNGConfig,
              private afs: AngularFirestore,
              private authService: AuthService,
              private apiService: ApiService) {
  }

  ionViewWillEnter(){
    this.getUsuarioLogado();
    this.carregaPedidos();
  }

  async getUsuarioLogado() {
    const user = await this.authService.getAuth().currentUser;
    await this.afs.collection('Usuarios').doc(user.uid).
    valueChanges().pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      this.usuarioLogado = data;
      this.carregaPedidos();
    });
  }


  async carregaPedidos(){

    try{
      await this.apiService.getMinhaAgenda(this.date, this.usuarioLogado.cpf).pipe(takeUntil(this.ngUnsubscribe)).subscribe((data: any[]) =>{
        this.pedidos = data;

        this.pedidos.sort(function (a,b) {
          return a.horario < b.horario ? -1 : a.horario > b.horario ? 1 : 0;
        });

        let numero = '';
        if(this.pedidos.length > 0){
          for(let i = 0; i < this.pedidos.length; i++){
            if(i === 0){
              numero = numero.concat(this.pedidos[i].pedido);
            } else {
              numero = numero.concat(', ' + this.pedidos[i].pedido);
            }
          }
        }
      });
    } catch (e) {
      console.log(e);
    }


  }

  async detalhesPedidos(numero){
    try {

      await this.apiService.getDetalhesPedidos(numero).then(data => {
        this.listaPedidosDetalhes = data;
      });

      // await this.apiService.getDetalhesPedidos(numero).subscribe((lista: any[]) => {
      //   this.listaPedidosDetalhes = lista;
      // });
    } catch (e) {
      console.log(e)
    } finally {

    }

  }

  onSelect(ev){
    this.step = -1;
    this.carregaPedidos();
  }

  async atualizaStatus(status, pedido){
    if(status === 1){
      try{
        await this.apiService.updateHorario(status, pedido.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe( result =>{
          if(result){
            this.carregaPedidos();
          }
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        await this.apiService.deleteHorario(pedido.id, this.date.toLocaleDateString('pt-BR').replace('/', '.').replace('/', '.')).pipe(takeUntil(this.ngUnsubscribe)).subscribe(result =>{
          console.log('horario deletado!!');
          this.carregaPedidos();
        });
      } catch (e) {
        console.log(e);
      }

    }
  }

  compararHora(hora1, hora2)
  {
    hora1 = hora1.split(":");
    hora2 = hora2.split(":");

    let d = new Date();
    let data1 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), hora1[0], hora1[1]);
    let data2 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), hora2[0], hora2[1]);

    return data1 > data2;
  };

  setStep(index: number, pedido) {

    this.pedidoExpandido = [];
    this.quantidadeTotal = 0;
    this.valorTotal = 0;

    this.pedidos.forEach(item =>{
      if(item.pedido == pedido.pedido){
        this.pedidoExpandido.push(item);
        this.quantidadeTotal += item.quantidade;
      }
    });

    console.log(this.pedidoExpandido);
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  ngOnInit() {
    this.config.setTranslation({
      accept: 'Aceitar',
      reject: 'Cancelar',
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      monthNames: ['JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO', 'JULHO',
        'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      today: 'Hoje',
      clear: 'Limpar'
    });

  }

  ionViewWillLeave() {
    this.ngOnDestroy();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
