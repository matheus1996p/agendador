import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {CalendarComponent, NgCalendarModule} from "ionic2-calendar";
import {AngularFirestore} from "@angular/fire/firestore";
import {User} from "../../interfaces/user";
import {PrimeNGConfig} from "primeng/api";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from '@angular/cdk/keycodes';

export interface Horario {
  horario: string;
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
  value: Date;
  pt: any;
  horariosBloqueados = new Array<Horario>();
  horariosDisponiveis: any[];
  horario: string = "off";
  display: boolean = true;


// Variaveis do input Material
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
//

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(private authService: AuthService,
              private afs: AngularFirestore,
              private config: PrimeNGConfig) {
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

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.horariosBloqueados.push({horario: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(horario): void {
    const index = this.horariosBloqueados.indexOf(horario);

    if (index >= 0) {
      this.horariosBloqueados.splice(index, 1);
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
}
