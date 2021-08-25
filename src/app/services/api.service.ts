import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  createData(){

  }

  getHorarios(){
  }


  getNotas(){
    return this.http.get(`${environment.apiUrl}/notasFiscais`);
  }

  getPessoa(cpf: string){
    const params = new HttpParams()
                  .set('cpf', cpf);
    return this.http.get(`${environment.apiUrl}/contamov?${params.toString()}`);
  }

  getConfAgendamento(){
    return this.http.get(`${environment.apiUrl}/confAgendamento`);
  }

  setConfAgendamento(bloqueados, horainicial, horafinal, intervalo, domingo, segunda, terca, quarta, quinta, sexta, sabado){
    const id = 1;
    const params = new HttpParams()
      .set('id', id)
      .set('bloqueados', bloqueados)
      .set('horainicial', horainicial)
      .set('horafinal', horafinal)
      .set('intervalo', intervalo)
      .set('domingo', domingo)
      .set('segunda', segunda)
      .set('terca', terca)
      .set('quarta', quarta)
      .set('quinta', quinta)
      .set('sexta', sexta)
      .set('sabado', sabado);
    return this.http.post(`${environment.apiUrl}/confAgendamento`, params);
  }

  updateData(){

  }

  deleteData(){

  }
}
