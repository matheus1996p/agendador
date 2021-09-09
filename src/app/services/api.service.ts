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
    // const params = new HttpParams()
    //   .set('placa', placa);
    return this.http.get(`${environment.apiUrl}/listaProdutos`);
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

  deleteHorario(id, data){
    const params = new HttpParams()
      .set('id', id);
    return this.http.get(`${environment.apiUrl}/marcarHorario/delete/${id}`);
  }


  updateHorario(status, id){
    const params = new HttpParams()
      .set('status', status)
      .set('id', id);
    return this.http.post(`${environment.apiUrl}/marcarHorario/atualiza/${status}/${id}`, params);
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

  setMarcarHorario(pedido, descricao, quantidade, cpf, placa, data, horario){
    const params = new HttpParams()
      .set('pedido', pedido)
      .set('descricao', descricao)
      .set('quantidade', quantidade)
      .set('cpf', cpf)
      .set('placa', placa)
      .set('data', data)
      .set('horario', horario)
      .set('status', 0);

    return this.http.post(`${environment.apiUrl}/marcarHorario`, params);
  }

  updateData(){

  }

  deleteData(){

  }
}
