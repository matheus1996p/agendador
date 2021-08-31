import {Component, OnInit, ViewChild} from '@angular/core';
import {IonSlides, LoadingController, ToastController} from "@ionic/angular";
import {User} from "../../interfaces/user";
import {AuthService} from "../../services/auth.service";
import {AngularFirestore} from "@angular/fire/firestore";
import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;
  public wavesPosition: number = 0;
  private wavesDifference: number = 100;
  public userLogin: User = {};
  public userRegister: User = {};
  private loading: any;

  constructor(private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private authService: AuthService,
              private afs: AngularFirestore,
              public keyboard: Keyboard) { }

  ngOnInit() {
  }

  segmentChanged(event: any) {
    if (event.detail.value === 'login') {
      this.slides.slidePrev();
      this.wavesPosition += this.wavesDifference;
    } else {
      this.slides.slideNext();
      this.wavesPosition -= this.wavesDifference;
    }
  }

  async login() {
    await this.presentLoading();
    try {
      await this.authService.login(this.userLogin);
    } catch (error) {
      console.error(error);
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
    }

  }

  async register() {
    await this.presentLoading();

    try {
      const user = await this.authService.register(this.userRegister);
      const newUser = Object.assign({}, this.userRegister);
      delete newUser.senha;
      newUser.admin = false;
      newUser.uid = user.user.uid;
      await this.afs.collection('Usuarios').doc(user.user.uid).set(newUser);
    } catch (error) {
      let message: string;
      switch (error.code) {
        case 'auth/email-already-in-use':
          message = 'E-mail ja esta sendo utilizado!'
          break;
        case 'auth/invalid-email':
          message = 'E-mail inválido'
          break;
        default: message = error.message
      }

      console.error(error);
      this.presentToast(message);
    } finally {
      this.loading.dismiss();
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


}
