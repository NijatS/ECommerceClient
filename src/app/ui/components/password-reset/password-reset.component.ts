import { UserAuthService } from './../../../services/common/models/user-auth.service';
import { Component } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessagePositionEnum, MessageTypeEnum } from '../../../services/admin/alertify.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss'
})
export class PasswordResetComponent extends BaseComponent {

  constructor(spinner:NgxSpinnerService,private userAuthService:UserAuthService,
    private alertify:AlertifyService
  ){
    super(spinner);
  }
  async passwordReset(email:string){
   this.showSpinner(SpinnerType.BallFussion)
   await this.userAuthService.passwordReset(email,()=>{
    this.hideSpinner(SpinnerType.BallFussion)
    this.alertify.message("Message successfully sent.",{
      messageType:MessageTypeEnum.Notify,
      position:MessagePositionEnum.TopRight
    })
   })
  }
}
