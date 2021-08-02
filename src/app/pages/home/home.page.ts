import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {CalendarComponent, NgCalendarModule} from "ionic2-calendar";
import {AngularFirestore} from "@angular/fire/firestore";
import {User} from "../../interfaces/user";
import {PrimeNGConfig} from "primeng/api";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  eventSource = [];
  public usuarioLogado: User = {};
  viewTitle: string;
  calendar = {
    mode: 'month',
    color: 'primary',
    currentDate: new Date()
  };

  value: Date;
  pt: any;
  horariosDisponiveis: any[];
  horario: string = "off";

  selected: Date | null;


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

  onChange($event) {
    console.log($event);
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

  back(){
    this.myCal.slidePrev();
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }


  createRandomEvents() {
    var events = [];
    for (var i = 0; i < 50; i += 1) {
      var date = new Date();
      var eventType = Math.floor(Math.random() * 2);
      var startDay = Math.floor(Math.random() * 90) - 45;
      var endDay = Math.floor(Math.random() * 2) + startDay;
      var startTime;
      var endTime;
      if (eventType === 0) {
        startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
        if (endDay === startDay) {
          endDay += 1;
        }
        endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
        events.push({
          title: 'All Day - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: true
        });
      } else {
        var startMinute = Math.floor(Math.random() * 24 * 60);
        var endMinute = Math.floor(Math.random() * 180) + startMinute;
        startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
        endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
        events.push({
          title: 'Event - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: false
        });
      }
    }
    this.eventSource = events;
  }
  removeEvents(){
    this.eventSource = [];
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
