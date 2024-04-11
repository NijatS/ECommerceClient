import { Injectable } from '@angular/core';
declare var alertify:any;
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }
  message(message: string,options:Partial<AlertifyOptions>){
    alertify.set('notifier','position',options.position);
    alertify.set('notifier','delay',options.delay);
     const msg = alertify[options.messageType](message);
     if(options.dismissOthers){
     // msg.dismissOther();
     }
  }
  dismiss(){
     alertify.dismissAll();
  }
}
export enum MessageTypeEnum{
  Error = "error",
  Message ="message",
  Notify = "notify",
  Success = "success",
  Warning = "warning"
}

export enum MessagePositionEnum{
  TopCenter = "top-center",
  TopLeft = "top-left",
  TopRight = "top-right",
  BottomRight = "bottom-right",
  BottomLeft = "bottom-left",
  BottomCenter = "bottom-center"
}
export class AlertifyOptions{
  messageType:MessageTypeEnum =MessageTypeEnum.Message;
  position:MessagePositionEnum=MessagePositionEnum.BottomLeft;
  delay : number = 5 ;
  dismissOthers :boolean =false;
}