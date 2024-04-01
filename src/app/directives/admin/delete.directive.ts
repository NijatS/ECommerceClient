import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from './../../services/common/models/product.service';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Renderer2, Output } from '@angular/core';
import { SpinnerType } from '../../base/base.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from '../../dialogs/delete-dialog/delete-dialog.component';

declare var $:any;
@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element:ElementRef,
    private _renderer:Renderer2,
    private ProductService:ProductService,
    private spinner:NgxSpinnerService,
    public dialog: MatDialog)
    {
const icon = _renderer.createElement("i");
icon.setAttribute("class","fas fa-trash");
icon.setAttribute("style","cursor: pointer; color : #ff0000");


_renderer.appendChild(element.nativeElement,icon)
    }
@Input() id:string;
@Output() callBack:EventEmitter<any> = new EventEmitter();

@HostListener("click")
    onclick(){
      this.openDialog(async ()=>{
        this.spinner.show(SpinnerType.BallFussion)
        const td : HTMLTableCellElement = this.element.nativeElement;
        this.ProductService.delete(this.id)
        $(td.parentElement)
        .animate({
          opacity:0,
          left: "+=50",
          height: "toogle"
        },700,()=>{
          this.callBack.emit();
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


