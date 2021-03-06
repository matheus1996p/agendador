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

  getListaPedidos(){
    return this.http.get(`${environment.apiUrl}/listaProdutos`);
  }

  getListaConfNota(){
    return this.http.get(`${environment.apiUrl}/sql/pedidos/notaConf`);
  }

  getListaConfPedidos(){
    return this.http.get(`${environment.apiUrl}/sql/pedidos/pedidoConf`);
  }

  getVendaFutura(cpf, confNota, confPedido){
    const params = new HttpParams()
      .set('CPF', cpf)
      .set('CONFNOTA', confNota)
      .set('CONFPEDIDO', confPedido);
    return this.http.get(`${environment.apiUrl}/sql/pedidos/vendaFutura?${params.toString()}`);
  }

  getDiasDisponiveis(data){
    const params = new HttpParams()
      .set('data', data);
    return this.http.get(`${environment.apiUrl}/marcarHorario?${params.toString()}`);
  }

  getMinhaAgenda(data, cpf){
    const params = new HttpParams()
      .set('cpf', cpf)
      .set('data', data);
    return this.http.get(`${environment.apiUrl}/marcarHorario/minhaAgenda?${params.toString()}`);
  }

  deleteHorario(horario, data){
    const params = new HttpParams()
      .set('horario', horario)
      .set('data', data);
    return this.http.get(`${environment.apiUrl}/marcarHorario/delete/${horario}/${data}`);
  }


  updateHorario(status, horario, data){
    const params = new HttpParams()
      .set('status', status)
      .set('horario', horario)
      .set('data', data);
    return this.http.post(`${environment.apiUrl}/marcarHorario/atualiza/${status}/${horario}/${data}`, params);
  }

  // getDetalhesPedidos(pedidos){
  //   const params = new HttpParams()
  //     .set('pedidos', pedidos);
  //   return this.http.get(`${environment.apiUrl}/listaProdutos/detalhes?${params.toString()}`);
  // }

  async getDetalhesPedidos(pedidos): Promise<any[]>{
    const listaDados = [];
    const params = new HttpParams()
      .set('pedidos', pedidos);
    const dadosApi = await this.http.get<any[]>(`${environment.apiUrl}/listaProdutos/detalhes?${params.toString()}`).toPromise().then(dataApi=> {
        dataApi.forEach(dado => {
          listaDados.push(dado);
        });
      }
    );
    return listaDados;
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

  setMarcarHorario(listaProdutos: any[]){
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    let listarProdutosJSON = JSON.parse(JSON.stringify(listaProdutos));
    return this.http.post(`${environment.apiUrl}/marcarHorario`, listarProdutosJSON, {headers});
  }

  updateData(){

  }

  deleteData(){

  }
}
