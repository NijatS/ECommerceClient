import { Component } from '@angular/core';
import { CustomerToastrService, ToastrPosition, ToastrType } from './services/ui/customer-toastr.service';
import { AuthService } from './services/common/auth.service';
import { Router } from '@angular/router';
declare var $:any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(public authService:AuthService,private toastService:CustomerToastrService,private router:Router){
    authService.identityCheck()
  }
  signOut(){
    localStorage.removeItem("accessToken");
    this.authService.identityCheck()
    this.router.navigate([""])
    this.toastService.message("You have been logged out","Logout",{
      toastrType:ToastrType.Warning,
      toastrPosition:ToastrPosition.TopRight
    })
  }
}

