import { AlertifyService, MessagePositionEnum, MessageTypeEnum } from './../../../services/admin/alertify.service';
import { SignalRService } from './../../../services/common/signal-r.service';
import { Component, Inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { ReceiveFunctions } from '../../../constants/receive-functions';
import { HubUrls } from '../../../constants/hub-urls';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrl: './dasboard.component.scss'
})
export class DasboardComponent extends BaseComponent {
  constructor( spinner:NgxSpinnerService,private signalRService:SignalRService,private alertifyService:AlertifyService,
  
  ){
    super(spinner)
    signalRService.start(HubUrls.ProductHub)
    signalRService.start(HubUrls.OrderHub)
  }
  ngOnInit(): void {
    this.signalRService.on(ReceiveFunctions.ReceiveProductAddedMessage,message=>{
      this.alertifyService.message(message,{
        messageType:MessageTypeEnum.Message,
        position:MessagePositionEnum.TopRight
      })
    });

    this.signalRService.on(ReceiveFunctions.OrderAddedMessage,message=>{
      this.alertifyService.message(message,{
        messageType:MessageTypeEnum.Message,
        position:MessagePositionEnum.TopRight
      })
    });
  }
}
