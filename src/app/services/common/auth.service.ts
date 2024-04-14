import { UserAuthService } from './models/user-auth.service';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private jwtHelper:JwtHelperService,private userAuthService:UserAuthService) { }
  
  async identityCheck(){
  
  let token: string;
  if(localStorage.getItem("accessToken")){
    token = localStorage.getItem("accessToken")
  }

  let isExpired :boolean;
  try {
    isExpired = this.jwtHelper.isTokenExpired(token);
  } catch {
    isExpired = true;
  }
  if(isExpired && token){
   try{
   await this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken"));
      token = localStorage.getItem("accessToken");
      isExpired = this.jwtHelper.isTokenExpired(token);
   }
   catch{
    localStorage.removeItem("refreshToken")
   }
  }
    _isAuthenticated = token != null && !isExpired ;
  }

  get isAuthenticated():boolean{
    return _isAuthenticated;
  }
}

export let _isAuthenticated:boolean;
