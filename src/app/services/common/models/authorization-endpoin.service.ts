import { Observable, firstValueFrom } from 'rxjs';
import { HttpClientService } from './../http-client.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationEndpoinService {

  constructor(private httpClientService:HttpClientService) { }

  async assignRoleEndpoint(roles:string[],code:string,menu:string,successCallBack?:()=>void,errorCallBack?:()=>void){
   const obs: Observable<any> = this.httpClientService.post({
    controller:"authorizationendpoints",
   },{
    roles:roles,
    code:code,
    menu:menu,
   })

   const promiseData = obs.subscribe({
    next:successCallBack,
    error:errorCallBack
   });
   await promiseData;
    }
    
  async getRolesToEndpoint(code:string,menu:string,successCallBack?:()=>void,errorCallBack?:()=>void) : Promise<string[]>{
    const obs: Observable<any> = this.httpClientService.post({
      controller:"authorizationendpoints",
      action:"get-roles-to-endpoint"
     },{code:code,menu:menu})
  
     const promiseData = firstValueFrom(obs);

      promiseData.then(successCallBack)
       .catch(errorCallBack);

     return (await promiseData).roles;
  }
}
