import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {CalendarComponent, NgCalendarModule} from "ionic2-calendar";
import {AngularFirestore} from "@angular/fire/firestore";
import {User} from "../../interfaces/user";
import {PrimeNGConfig} from "primeng/api";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";

export interface Horario {
  horario: string;
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
export class HomePage implements OnInit {

  public usuarioLogado: User = {};
  calendar = {
    mode: 'month',
    color: 'primary',
    currentDate: new Date()
  };
  val: string;

  horaInicialControl = new FormControl();
  horaFinalControl = new FormControl();
  intervaloControl = new FormControl();

  value: Date;
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

  constructor(private authService: AuthService,
              private afs: AngularFirestore,
              private config: PrimeNGConfig,
              private fb: FormBuilder) {
    this.conf = fb.group({
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

    this.horariosDisponiveis = [{label: '08:30', value: '08:30'},
                         {label: '09:00', value: '09:00'},
                         {label: '09:30', value: '09:30'},
                         {label: '10:00', value: '10:00'},
                         {label: '10:30', value: '10:30'},
                         {label: '11:00', value: '11:00'}
                        ];
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
    this.getUsuarioLogado();
  }

  next(){
    this.myCal.slideNext();
  }

  onSelect(data){
    console.log(data.toLocaleDateString('pt-BR'));

  }

  showDialog() {
    this.display = true;
  }

  salvarConf(conf){
    console.log(conf);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.bloqueados.value.push({horario: value});

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
      console.log(this.usuarioLogado);
    });
  }

  async logout(){
    try {
     await this.authService.logout();
    } catch (e) {
      console.error(e);
    }
  }
  get bloqueados() {
    return this.conf.get('bloqueados');
  }

  get dias() {
    return this.conf.get('dias');
  }

}
