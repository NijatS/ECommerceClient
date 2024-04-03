import { NgxSpinnerService } from 'ngx-spinner';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Renderer2, Output } from '@angular/core';
import { SpinnerType } from '../../base/base.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from '../../dialogs/delete-dialog/delete-dialog.component';
import { HttpClientService } from '../../services/common/http-client.service';
import { AlertifyService, MessagePositionEnum, MessageTypeEnum } from '../../services/admin/alertify.service';
import { HttpErrorResponse } from '@angular/common/http';

declare var $:any;
@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element:ElementRef,
    private _renderer:Renderer2,
    private httpClientService:HttpClientService,
    private spinner:NgxSpinnerService,
    public dialog: MatDialog,
    private alertify:AlertifyService)
    {
const icon = _renderer.createElement("i");
icon.setAttribute("class","fas fa-trash");
icon.setAttribute("style","cursor: pointer; color : #ff0000");


_renderer.appendChild(element.nativeElement,icon)
    }
@Input() id:string;
@Input() controller:string
@Output() callBack:EventEmitter<any> = new EventEmitter();

@HostListener("click")
    onclick(){
      this.openDialog(async ()=>{
        this.spinner.show(SpinnerType.BallFussion)
        const td : HTMLTableCellElement = this.element.nativeElement;
       // this.ProductService.delete(this.id)
       this.httpClientService.delete({
        controller : this.controller
       },this.id).subscribe(data=>{
        $(td.parentElement)
        .animate({
          opacity:0,
          left: "+=50",
          height: "toogle"
        },700,()=>{
          this.callBack.emit();
          this.alertify.message("Product successfully removed",{
            dismissOthers : true,
            messageType: MessageTypeEnum.Success,
            position:MessagePositionEnum.TopRight
          })
        })
        },(errorResponse:HttpErrorResponse)=>{
          this.alertify.message("The Error when the product is removed",{
            dismissOthers : true,
            messageType: MessageTypeEnum.Error,
            position:MessagePositionEnum.TopRight
          })
          this.spinner.hide(SpinnerType.BallFussion)
        })
       })
      };
     
    openDialog(afterClosed:any): void {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        width:'250px',
        data:DeleteState.Yes,
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result == DeleteState.Yes){
          afterClosed()
        }
      });
    }
}


