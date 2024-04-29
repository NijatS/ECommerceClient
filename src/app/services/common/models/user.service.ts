import { CustomerToastrService } from './../../ui/customer-toastr.service';
import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from '../../../entities/user';
import { Register_User } from '../../../contracts/users/register_user';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClientService:HttpClientService,private CustomerToastrService:CustomerToastrService) { }

  async register(user:User) : Promise<Register_User>{
  const obs =   this.httpClientService.post<Register_User | User>({
  controller:"users"
},user);
  return await firstValueFrom(obs) as Register_User;
  }
async updatePassword(userId:string,resetToken:string,password:string,passwordConfirm:string,successCallBack?:()=>void,errorCallBack?:(error)=>void){
  const obs = this.httpClientService.post({
    controller:"users",
    action:"update-password"
  },{userId:userId,resetToken:resetToken,password:password,passwordConfirm:passwordConfirm});

  const promiseData =  firstValueFrom(obs);

  promiseData.then(value=>successCallBack())
  .catch(error => errorCallBack(error));
  await promiseData;
}

  
}
