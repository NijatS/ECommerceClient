import { ProductService } from './../../services/common/models/product.service';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Renderer2, Output } from '@angular/core';

declare var $:any;
@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element:ElementRef,
    private _renderer:Renderer2,
    private ProductService:ProductService)
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
      const td : HTMLTableCellElement = this.element.nativeElement;
      this.ProductService.delete(this.id)
      $(td.parentElement).fadeOut(1000,()=>{
        this.callBack.emit();
      });
    }

}
// <i
// (click)="delete(element.id, $event)"
// class="fas fa-trash"
// style="color: #ff0000"
// ></i>