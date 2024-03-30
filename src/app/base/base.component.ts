import {  NgxSpinnerService } from "ngx-spinner";

export class BaseComponent {
 constructor(public spinner:NgxSpinnerService){}

 showSpinner(type:SpinnerType){
  this.spinner.show(type);
 }
 hideSpinner(type:SpinnerType){
  this.spinner.hide(type);
 }
}
export enum SpinnerType{
  BallSpinClockwiseFade = "s1",
  SquareJellyBox = "s2",
  BallFussion = "s3"
}