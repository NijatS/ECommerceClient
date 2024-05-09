import { CustomerToastrService } from './../../ui/customer-toastr.service';
import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from '../../../entities/user';
import { Register_User } from '../../../contracts/users/register_user';
import { Observable, firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { List_User } from '../../../contracts/users/list_user';

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
async getAllUsers(page = 0,size = 5,succesCallBack?,errorCalBack?){
  const promiseDate =  this.httpClientService.get<{users:List_User[],totalUserCount:number}>({
    controller:"users",
    queryString:`page=${page}&size=${size}`
  }).toPromise();  
  promiseDate.then(
    d => succesCallBack()
  )
    .catch(
     (errorResponse: HttpErrorResponse) =>{
      errorCalBack(errorResponse.message)
     }
    );

  return await promiseDate;
}
async assignRoleToUser(id:string,roles:string[],successCallBack?:()=>void,errorCallBack?:()=>void){
  const obs: Observable<any> = this.httpClientService.post({
   controller:"users",
   action:"assign-role-to-user"
  },{
   roles:roles,
   userId:id
  })

  const promiseData = obs.subscribe({
   next:successCallBack,
   error:errorCallBack
  });
  await promiseData;
   }

   async getRolesToUser(userId:string,successCallBack?:()=>void,errorCallBack?:(error)=>void){
    const obs :Observable<{roles:string[]}> = this.httpClientService.get({
      controller:"users",
      action:"get-roles-to-user"
    },userId)

    const promiseData = firstValueFrom(obs);
    promiseData.then(successCallBack)
      .catch(error=>errorCallBack(error))


      return (await promiseData).roles;
   }
  
}
