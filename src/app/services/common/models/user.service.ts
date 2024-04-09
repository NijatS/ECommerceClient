import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from '../../../entities/user';
import { Register_User } from '../../../contracts/users/register_user';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClientService:HttpClientService) { }

  async register(user:User) : Promise<Register_User>{
  const obs =   this.httpClientService.post<Register_User | User>({
  controller:"users"
},user);
  return await firstValueFrom(obs) as Register_User;
  }

  async login(userNameOrEmail:string,password:string,callBack?:()=>void){
   const obs =  this.httpClientService.post({
      controller:"users",
      action:"login"
    },{userNameOrEmail,password})
   await firstValueFrom(obs);
   callBack();
  }
}
