import { RoleService } from './../../../../services/common/models/role.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessagePositionEnum, MessageTypeEnum } from '../../../../services/admin/alertify.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent  extends BaseComponent implements OnInit{
  constructor(spinner:NgxSpinnerService,private roleService:RoleService,private alertify:AlertifyService){
    super(spinner)
  }
 ngOnInit(): void {
   
 }
 @Output() createdRole: EventEmitter<string> = new EventEmitter();


 create(name:HTMLInputElement){

  this.showSpinner(SpinnerType.BallFussion);


  
  this.roleService.create(name.value,()=>{
    this.hideSpinner(SpinnerType.BallFussion)
    this.alertify.message("Role Sucessfully added",{
      dismissOthers : false,
      messageType : MessageTypeEnum.Success,
      position : MessagePositionEnum.TopRight
    });
    this.createdRole.emit(name.value);
  }, errorMessage =>{
    this.hideSpinner(SpinnerType.BallFussion)
    this.alertify.message(errorMessage,{
      dismissOthers : false,
      messageType : MessageTypeEnum.Error,
      position : MessagePositionEnum.TopRight
    })
  }
  );
 }

}
