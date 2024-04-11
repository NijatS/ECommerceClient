import { AuthService, _isAuthenticated } from './../../../services/common/auth.service';
import { Component } from '@angular/core';
import { UserService } from '../../../services/common/models/user.service';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseComponent {
  constructor(private userService:UserService,
    private authService: AuthService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    spinner:NgxSpinnerService
  ){
    super(spinner)
  }
  async  login(userNameOrEmail:string,password:string){
    this.spinner.show(SpinnerType.SquareJellyBox)
    await this.userService.login(userNameOrEmail,password,()=>{
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
  }
 
}

