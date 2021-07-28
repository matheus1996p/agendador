import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {CalendarComponent, NgCalendarModule} from "ionic2-calendar";
import {AngularFirestore} from "@angular/fire/firestore";
import {User} from "../../interfaces/user";

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


  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(private authService: AuthService,
              private afs: AngularFirestore) {
   this.getUsuarioLogado();
  }

  onChange($event) {
    console.log($event);
  }
  ngOnInit() {
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
    await this.afs.collection('Users').doc(user.uid).
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
