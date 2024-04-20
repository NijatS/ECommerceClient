import { DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
import { Component, ViewChild } from '@angular/core';
import { CustomerToastrService, ToastrPosition, ToastrType } from './services/ui/customer-toastr.service';
import { AuthService } from './services/common/auth.service';
import { Router } from '@angular/router';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
import {Component as DynamicComonent} from "../app/services/common/dynamic-load-component.service"
declare var $:any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
@ViewChild(DynamicLoadComponentDirective,{static:true})
dynamicLoadComponentDirective:DynamicLoadComponentDirective;

  constructor(public authService:AuthService,private toastService:CustomerToastrService,private router:Router,
    private dynamicLoadComponentService:DynamicLoadComponentService

  ){
    authService.identityCheck()
  }
  signOut(){
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken")
    this.authService.identityCheck().then(()=>{
      this.router.navigate([""])
      this.toastService.message("You have been logged out","Logout",{
        toastrType:ToastrType.Warning,
        toastrPosition:ToastrPosition.TopRight
      })
    })
  }
  loadComponent(){
   this.dynamicLoadComponentService.loadComponent(DynamicComonent.BasketsComponent, this.dynamicLoadComponentDirective.viewContainerRef)

  }
}

