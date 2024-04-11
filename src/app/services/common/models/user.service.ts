import { tokenResponse } from './../../../contracts/token/token_response';
import { CustomerToastrService, ToastrPosition, ToastrType } from './../../ui/customer-toastr.service';
import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from '../../../entities/user';
import { Register_User } from '../../../contracts/users/register_user';
import { firstValueFrom } from 'rxjs';
import { Token } from '../../../contracts/token/token';
import { SocialUser } from '@abacritt/angularx-social-login';

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

  async login(userNameOrEmail:string,password:string,callBack?:()=>void){
   const obs =  this.httpClientService.post<any | Token>({
      controller:"users",
      action:"login"
    },{userNameOrEmail,password})
  const tokenResponse : tokenResponse =  await firstValueFrom(obs) as tokenResponse;
  const token = tokenResponse.token;
  if(token){
  localStorage.setItem("accessToken",token.accessToken);
    this.CustomerToastrService.message("Successfully Login","Login",{
      toastrType : ToastrType.Success,
      toastrPosition : ToastrPosition.TopRight
    })
  }
   callBack();
  }

  async googleLogin(user:SocialUser,callBack?:()=>void){
  const obs =  this.httpClientService.post<SocialUser | tokenResponse> ({
      action:"google-login",
      controller:"users"
    },user);

   const response :tokenResponse =  await firstValueFrom(obs) as tokenResponse;

   if(response){
    localStorage.setItem("accessToken",response.token.accessToken)
    this.CustomerToastrService.message("Successfully Google Login","Login",{
      toastrType : ToastrType.Success,
      toastrPosition : ToastrPosition.TopRight
    })
  }
   callBack();
   }
}
