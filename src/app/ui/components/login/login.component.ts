import { AuthService, _isAuthenticated } from './../../../services/common/auth.service';
import { Component } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { FacebookLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { UserAuthService } from '../../../services/common/models/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseComponent {
  constructor(private userAuthService:UserAuthService,
    private authService: AuthService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private socialAuthService:SocialAuthService,
    spinner:NgxSpinnerService
  ){
    super(spinner)
    
    this.socialAuthService.authState.subscribe(async (user: SocialUser) => {
      this.spinner.show(SpinnerType.SquareJellyBox)
   switch(user.provider){
   case "GOOGLE":
    await this.userAuthService.googleLogin(user,()=>{
      this.authService.identityCheck();
      this.activatedRoute.queryParams.subscribe(params =>{
       const returnUrl =  params["returnUrl"]
       if(returnUrl){
         this.router.navigate([returnUrl])
       }
       else{
          this.router.navigate([""])
       }
   
      })
     });
     break;
  case "FACEBOOK":
    await this.userAuthService.facebookLogin(user,()=>{
      this.authService.identityCheck();
      this.activatedRoute.queryParams.subscribe(params =>{
       const returnUrl =  params["returnUrl"]
       if(returnUrl){
         this.router.navigate([returnUrl])
       }
       else{
          this.router.navigate([""])
       }
      })
      this.hideSpinner(SpinnerType.SquareJellyBox)
     });
     break;
}
})
}
  async  login(userNameOrEmail:string,password:string){
    this.spinner.show(SpinnerType.SquareJellyBox)
    await this.userAuthService.login(userNameOrEmail,password,()=>{
    this.authService.identityCheck();
    
    this.activatedRoute.queryParams.subscribe(params =>{
     const returnUrl =  params["returnUrl"]
     if(returnUrl){
       this.router.navigate([returnUrl])
     }
     else{
        this.router.navigate([""])
     }
    })
   });
   this.hideSpinner(SpinnerType.SquareJellyBox)
  }
  FacebookLogin(){
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
  }
 
}

