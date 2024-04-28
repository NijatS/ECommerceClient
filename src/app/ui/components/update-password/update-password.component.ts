import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserAuthService } from '../../../services/common/models/user-auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.scss'
})
export class UpdatePasswordComponent extends BaseComponent implements OnInit {
  constructor(spinner:NgxSpinnerService,private userAuthService:UserAuthService,
    private activatedRoute:ActivatedRoute
  ){
    super(spinner)
  }

  state :boolean;

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallFussion)
    this.activatedRoute.params.subscribe({
      next :params =>{
        const userId:string = params["userId"]
        const resetToken:string = params["resetToken"]
        this.userAuthService.verifyResetToken(resetToken,userId,()=>{
          this.state = true;
          this.hideSpinner(SpinnerType.BallFussion)
        })
      }
    })
  }

}
