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

  updateData(){

  }

  deleteData(){

  }
}
