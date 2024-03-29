import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomerToastrService {

  constructor( private toastr:ToastrService) { }
  message(message : string, title :string,options: Partial<ToastrOptions>){
    this.toastr[options.toastrType](message,title,{
      positionClass:options.toastrPosition
    })
  }
}

export enum ToastrType{
  Success = "success",
  Error = "error",
  Info = "info",
  Warning = "warning"
}
export enum ToastrPosition{
  TopRight = "toast-top-right",
  BottomRight = "toast-bottom-right",
  BottomLeft = "toast-bottom-left",
  TopLeft = "toast-top-left",
  TopCenter = "toast-top-center",
  BottomCenter = "toast-bottom-center",
  TopFullWidth = "toast-top-full-width",
  BottomFullWidth = "toast-bottom-full-width"
}
export class ToastrOptions{
  toastrType:ToastrType;
  toastrPosition:ToastrPosition;
}