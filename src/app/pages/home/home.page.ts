import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {CalendarComponent, NgCalendarModule} from "ionic2-calendar";
import {AngularFirestore} from "@angular/fire/firestore";
import {User} from "../../interfaces/user";
import {PrimeNGConfig} from "primeng/api";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {LoadingController, ToastController} from "@ionic/angular";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";

export interface Horario {
  horario: string;
}

export interface Pedido {
  numero?: string;
  dtemissao?: string;
  dtvalidade?: string;
  valormercadoria?: string;
}

export interface Conf {
  horaInicial: string;
  horaFinal: string;
  intervalo: number;
  bloqueados: Array<Horario>;
  dias: [];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  public usuarioLogado: User = {};
  calendar = {
    mode: 'month',
    color: 'primary',
    currentDate: new Date()
  };

  horaInicialControl = new FormControl();
  horaFinalControl = new FormControl();
  intervaloControl = new FormControl();

  listaPedidos: any[];
  pedidoSelecionado: Pedido = {};

  value = new Date();
  pt: any;
  conf: FormGroup;
  horariosDisponiveis: any[];
  horario: string = "off";
  display: boolean = false;

// Variaveis do input Material
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
//

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  private loading: any;

  constructor(private authService: AuthService,
              private afs: AngularFirestore,
              private config: PrimeNGConfig,
              private fb: FormBuilder,
              private apiService: ApiService,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController) {

    this.carregaConf();

  }

  async carregaPedidos(){
    try{
      await this.apiService.getListaPedidos(this.usuarioLogado.placa).subscribe((pedidos: any[]) =>{
        this.listaPedidos = pedidos;
      })
    } catch (e) {
      console.log(e);
    }
  }

  async carregaConf(){

    this.conf = this.fb.group({
      horaInicial: this.horaInicialControl,
      horaFinal: this.horaFinalControl,
      intervalo: this.intervaloControl,
      bloqueados: new FormControl([]),
      domingo: new FormControl(false),
      segunda: new FormControl(false),
      terca: new FormControl(false),
      quarta: new FormControl(false),
      quinta: new FormControl(false),
      sexta: new FormControl(false),
      sabado: new FormControl(false),
    });

    await this.apiService.getConfAgendamento().subscribe(conf =>{
      this.conf.controls['horaInicial'].setValue(conf[0].horainicial);
      this.conf.controls['bloqueados'].setValue(conf[0].bloqueados.split(', '));
      this.conf.controls['horaFinal'].setValue(conf[0].horafinal);
      this.conf.controls['intervalo'].setValue(conf[0].intervalo);
      this.conf.controls['domingo'].setValue(conf[0].domingo === 1 ? true : false);
      this.conf.controls['segunda'].setValue(conf[0].segunda === 1 ? true : false);
      this.conf.controls['terca'].setValue(conf[0].terca === 1 ? true : false);
      this.conf.controls['quarta'].setValue(conf[0].quarta === 1 ? true : false);
      this.conf.controls['quinta'].setValue(conf[0].quinta === 1 ? true : false);
      this.conf.controls['sexta'].setValue(conf[0].sexta === 1 ? true : false);
      this.conf.controls['sabado'].setValue(conf[0].sabado === 1 ? true : false);

      this.carregaHorarios();

    });
  }

  addMinutes(time, minsToAdd) {
    function D(J){
      return (J<10? '0':'') + J;
    };
    let piece = time.split(':');
    let mins = piece[0]*60 + +piece[1] + +minsToAdd;

    return D(mins%(24*60)/60 | 0) + ':' + D(mins%60);
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


  async carregaHorarios(){

    await this.apiService.getDiasDisponiveis(this.value.toLocaleDateString('pt-BR').replace('/', '.').replace('/', '.')).subscribe((data: any[]) =>{
      let horario = this.conf.controls['horaInicial'].value;
      let horarios = [];
      console.log(data.length);
      console.log(this.conf.controls['horaInicial'].value);
      while (this.compararHora(this.conf.controls['horaFinal'].value, horario)) {
        let horarioDisponivel = {label: '', value: ''};
        horario  = this.addMinutes(horario + ':00', this.conf.controls['intervalo'].value);
        if(this.compararHora(this.conf.controls['horaFinal'].value, horario)){
          horarioDisponivel.label = horario;
          horarioDisponivel.value = horario;
          horarios.push(horarioDisponivel);
        }
      }
      this.horariosDisponiveis = horarios;
      for(let j = 0; j < this.horariosDisponiveis.length; j++){
        for(let i = 0; i < data.length; i++){
          if(this.horariosDisponiveis[j].value == data[i].horario){
            this.horariosDisponiveis.splice(j, 1);
          }
        }
      }
    });
  }

  ngOnInit() {

    // this.filteredOptions = this.listaPedidos.pipe(
    //   startWith(''),
    //   map(value => this._filter(value))
    // );

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
    this.getUsuarioLogado();
  }

  next(){
    this.myCal.slideNext();
  }

  onSelect(data){
    console.log(data.toLocaleDateString('pt-BR'));
    this.carregaHorarios();
  }

  showDialog() {
    this.display = true;
  }

  async salvarAgendamento(horario, data) {
     console.log(horario, data);
     console.log(this.usuarioLogado);
     console.log(this.pedidoSelecionado)

    await this.apiService.setMarcarHorario(this.pedidoSelecionado.numero, this.usuarioLogado.cpf, this.usuarioLogado.placa, horario, data).subscribe( data => {
      this.presentToast('Horário Marcado com sucesso!');
      this.horario = "off";
      this.pedidoSelecionado = {};
      this.carregaHorarios();
    });
  }

  salvarConf(conf){
    let bloqueados = '';
    if(conf.bloqueados.length > 0){
      for(let i = 0; i < conf.bloqueados.length; i++){
          if(i === 0){
            bloqueados = bloqueados.concat(conf.bloqueados[i].horario);
          } else {
            bloqueados = bloqueados.concat(', ' + conf.bloqueados[i].horario);
          }
      }
    }
    const horaFinal = conf.horaFinal;
    const horaInicial = conf.horaInicial;
    const intervalo = parseInt(conf.intervalo);
    const domingo = conf.domingo ? 1 : 0;
    const segunda = conf.segunda ? 1 : 0;
    const terca = conf.terca ? 1 : 0;
    const quarta = conf.quarta ? 1 : 0;
    const quinta = conf.quinta ? 1 : 0;
    const sexta = conf.sexta ? 1 : 0;
    const sabado = conf.sabado ? 1 : 0;

    this.apiService.setConfAgendamento(bloqueados, horaInicial, horaFinal, intervalo, domingo, segunda, terca, quarta, quinta, sexta, sabado).subscribe( data => {
      console.log('Configuração Salva');
      this.display = false;
    });

  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.bloqueados.value.push(value);
    }

    event.chipInput!.clear();
  }

  remove(horario): void {
    const index = this.bloqueados.value.indexOf(horario);

    if (index >= 0) {
      this.bloqueados.value.splice(index, 1);
    }
  }


  async getUsuarioLogado() {
    const user = await this.authService.getAuth().currentUser;
    await this.afs.collection('Usuarios').doc(user.uid).
    valueChanges().subscribe(data => {
      this.usuarioLogado = data;
      this.carregaPedidos();
    });
  }

  async logout(){
    try {
     await this.authService.logout();
    } catch (e) {
      console.error(e);
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

  get bloqueados() {
    return this.conf.get('bloqueados');
  }

  get dias() {
    return this.conf.get('dias');
  }

  ionViewWillLeave() {
    this.ngOnDestroy();
  }

  ngOnDestroy() {

  }

}
