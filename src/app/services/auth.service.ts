import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {User} from "../interfaces/user";
import {AngularFirestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afa: AngularFireAuth) { }

  login(user: User){
    return this.afa.signInWithEmailAndPassword(user.email, user.senha);
  }

  register(user: User){
  return this.afa.createUserWithEmailAndPassword(user.email, user.senha);
  }

  logout(){
    return this.afa.signOut();
  }

  getAuth(){
      return this.afa;
  }
}
