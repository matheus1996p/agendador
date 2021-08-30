import { Component, OnInit } from '@angular/core';
import {PrimeNGConfig} from "primeng/api";
import {ApiService} from "../../services/api.service";
import {User} from "../../interfaces/user";

@Component({
  selector: 'app-entregas',
  templateUrl: './entregas.page.html',
  styleUrls: ['./entregas.page.scss'],
})
export class EntregasPage implements OnInit {

  date = new Date();

  public pedidos = new Array<any>();

  public step: number;

  constructor(private config: PrimeNGConfig,
              private apiService: ApiService) {
    this.carregaPedidos();
  }

  async carregaPedidos(){
    await this.apiService.getDiasDisponiveis(this.date.toLocaleDateString('pt-BR').replace('/', '.').replace('/', '.')).subscribe((data: any[]) =>{
      this.pedidos = data;
    });
  }

  onSelect(ev){
    this.carregaPedidos();
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

}
