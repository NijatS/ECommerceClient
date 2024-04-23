import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';

declare var $:any;

@Component({
  selector: 'app-basket-complete-dialog',
  templateUrl: './basket-complete-dialog.component.html',
  styleUrl: './basket-complete-dialog.component.scss'
})
export class BasketCompleteDialogComponent extends BaseDialog<BasketCompleteDialogComponent> implements OnDestroy{
  constructor(dialogRef:MatDialogRef<BasketCompleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BasketCompleteState){
    super(dialogRef)
  }
  show:boolean =false;
  complete(){
    this.show = true;
  }

  ngOnDestroy(): void {
    if(!this.show)
      $("#basketModal").modal("show");
}

}


export enum BasketCompleteState{
  Yes,
  No
}