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
      url = `${this.url(parametr)}${id ? `/${id}` : ``}${parametr.queryString ? `?${parametr.queryString}` : "" }`;
    return this.httpClient.get<T>(url,{headers:parametr.headers,responseType:parametr.responseType as 'json'})
  }
  post<T>(parametr: Partial<RequestParamentrs>, body: Partial<T>): Observable<T> {
    let url: string = "";
    if (parametr.fullEndPoint)
      url = parametr.fullEndPoint;
    else
      url = `${this.url(parametr)}${parametr.queryString ? `?${parametr.queryString}` : ""}`

    return this.httpClient.post<T>(url, body, { headers: parametr.headers ,responseType:parametr.responseType as 'json'});
  }

  put<T>(parametr : Partial<RequestParamentrs>, body:Partial<T> ): Observable<T>{
    let url : string = "";
    if(parametr.fullEndPoint)
      url = parametr.fullEndPoint
    else
      url = `${this.url(parametr)} ${parametr.queryString ? `?${parametr.queryString}` : "" }`;
  
    return   this.httpClient.put<T>(url,body,{headers:parametr.headers,responseType:parametr.responseType as 'json'})
  }
  delete<T>(parametr : Partial<RequestParamentrs>,id:string) :Observable<T>{
    let url : string = "";
    if(parametr.fullEndPoint)
      url = parametr.fullEndPoint
    else
    url = `${this.url(parametr)}/${id} ${parametr.queryString ? `?${parametr.queryString}` : "" }`;

   return this.httpClient.delete<T>(url,{headers:parametr.headers,responseType:parametr.responseType as 'json'})
  }
}


export class RequestParamentrs{
  controller? : string;
  action? : string;
  queryString? : string
  headers? : HttpHeaders;
  baseUrl? : string;
  fullEndPoint? :string;
  responseType?:string = 'json';
}