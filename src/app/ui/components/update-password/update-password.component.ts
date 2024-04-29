import { AlertifyService, MessageTypeEnum } from './../../../services/admin/alertify.service';
import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserAuthService } from '../../../services/common/models/user-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/common/models/user.service';
import { error } from 'node:console';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.scss'
})
export class UpdatePasswordComponent extends BaseComponent implements OnInit {
  constructor(spinner:NgxSpinnerService,private userAuthService:UserAuthService,
    private activatedRoute:ActivatedRoute, private alertifyService:AlertifyService,
    private userService:UserService,private router:Router
  ){
    super(spinner)
  }

  state :any;

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallFussion)
    this.activatedRoute.params.subscribe({
      next :async params =>{
        const userId:string = params["userId"]
        const resetToken:string = params["resetToken"]
       this.state =  await this.userAuthService.verifyResetToken(resetToken,userId,()=>{
          this.hideSpinner(SpinnerType.BallFussion)
        })
      }
    })
  }
  updatePassword(password:string,passwordConfirm:string){
    this.showSpinner(SpinnerType.BallFussion);

    if(password !== passwordConfirm){
      this.alertifyService.message("Passwords are note same",{
       messageType:MessageTypeEnum.Error})
       this.hideSpinner(SpinnerType.BallFussion);
       return;
    }

    this.activatedRoute.params.subscribe({
      next :async params =>{
        const userId:string = params["userId"]
        const resetToken:string = params["resetToken"]
       await this.userService.updatePassword(userId,resetToken,password,passwordConfirm,
        ()=>{
          this.alertifyService.message("Password successfully updated",{
            messageType:MessageTypeEnum.Success
          })
          this.router.navigate(["/login"])
        },
        error =>{
          console.log(error)
        }
       );
        this.hideSpinner(SpinnerType.BallFussion);
      }
    })
  }

}
