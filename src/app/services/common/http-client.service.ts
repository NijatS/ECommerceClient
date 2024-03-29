import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient,@Inject("baseUrl") private baseUrl:string) {   }
 private url(parametr : Partial<RequestParamentrs>){
return `${parametr.baseUrl ? parametr.baseUrl : this.baseUrl}/${parametr.controller}${parametr.action ? `/${parametr.action}`:"" }`;
 }
  get<T>(parametr : Partial<RequestParamentrs>,id?:string) :Observable<T>{
    let url : string = "";
    if(parametr.fullEndPoint)
      url = parametr.fullEndPoint
    else
      url = `${this.url(parametr)}${id ? `/${id}` : ``}`;
    return this.httpClient.get<T>(url,{headers:parametr.headers})
  }
  post<T>(parametr : Partial<RequestParamentrs>, body:Partial<T> ):Observable<T>{
    let url : string = "";
    if(parametr.fullEndPoint)
      url = parametr.fullEndPoint
    else
      url = `${this.url(parametr)}`;
  
return   this.httpClient.post<T>(url,body,{headers:parametr.headers})
  }
  put(){

  }
  delete(){

  }
}


export class RequestParamentrs{
  controller? : string;
  action? : string;

  headers? : HttpHeaders;
  baseUrl? : string;
  fullEndPoint? :string;
}