import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CustomerToastrService, ToastrPosition, ToastrType } from '../../ui/customer-toastr.service';
import { Token } from '../../../contracts/token/token';
import { tokenResponse } from '../../../contracts/token/token_response';
import { firstValueFrom } from 'rxjs';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService:HttpClientService,private CustomerToastrService:CustomerToastrService
  ) { }


  async login(userNameOrEmail:string,password:string,callBack?:()=>void){
    const obs =  this.httpClientService.post<any | Token>({
       controller:"users",
       action:"auth"
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
       controller:"auth"
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
 
   async facebookLogin(user:SocialUser,callBack?:()=>void){
     const obs =  this.httpClientService.post<SocialUser | tokenResponse> ({
       action:"facebook-login",
       controller:"auth"
     },user);
 
    const response :tokenResponse =  await firstValueFrom(obs) as tokenResponse;
 
    if(response){
     localStorage.setItem("accessToken",response.token.accessToken)
     this.CustomerToastrService.message("Successfully Facebook Login","Login",{
       toastrType : ToastrType.Success,
       toastrPosition : ToastrPosition.TopRight
     })

   }
    callBack();
   }
}
