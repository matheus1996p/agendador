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

  getListaPedidos(placa){
    const params = new HttpParams()
      .set('placa', placa);
    return this.http.get(`${environment.apiUrl}/listaPedidos?${params.toString()}`);
  }

  getDiasDisponiveis(data){
    const params = new HttpParams()
      .set('data', data);
    return this.http.get(`${environment.apiUrl}/marcarHorario?${params.toString()}`);
  }

  deleteHorario(id, data){
    const params = new HttpParams()
      .set('id', id)
      .set('data', data);
    return this.http.get(`${environment.apiUrl}/marcarHorario/delete?${params.toString()}`);
  }


  updateHorario(status, id){
    const params = new HttpParams()
      .set('status', status)
      .set('id', id);
    return this.http.post(`${environment.apiUrl}/marcarHorario/atualiza`, params);
  }

  getDetalhesPedidos(pedidos){
    const params = new HttpParams()
      .set('pedidos', pedidos);
    return this.http.get(`${environment.apiUrl}/listaPedidos/detalhes?${params.toString()}`);
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

  setMarcarHorario(pedido, cpf, placa, horario, data){
    const params = new HttpParams()
      .set('pedido', pedido)
      .set('cpf', cpf)
      .set('placa', placa)
      .set('horario', horario)
      .set('data', data);
    return this.http.post(`${environment.apiUrl}/marcarHorario`, params);
  }

  updateData(){

  }

  deleteData(){

  }
}
