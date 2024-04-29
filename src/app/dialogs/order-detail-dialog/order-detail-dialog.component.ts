import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from '../../services/common/models/order.service';
import { Single_Order } from '../../contracts/order/single_order';
import { DialogService } from '../../services/common/dialog.service';
import { CompleteOrderDialogComponent, CompleteOrderState } from '../complete-order-dialog/complete-order-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { CustomerToastrService, ToastrPosition, ToastrType } from '../../services/ui/customer-toastr.service';

@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrl: './order-detail-dialog.component.scss'
})
export class OrderDetailDialogComponent extends BaseDialog<OrderDetailDialogComponent> implements OnInit {

  constructor(dialogRef: MatDialogRef<OrderDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderDetailDialogState | string,
  private orderService:OrderService,private dialogService:DialogService,private spinner:NgxSpinnerService,
  private toastrService:CustomerToastrService){
    super(dialogRef)
  }

  single_Order:Single_Order
  displayedColumns: string[] = ['name','price','quantity','totalPrice'];
  dataSource = [];
  clickedRows = new Set<any>();
  totalPrice:number;


  async ngOnInit() {
   this.single_Order = await  this.orderService.getOrderById(this.data as string);
   this.dataSource = this.single_Order.basketItems;

   this.totalPrice = this.single_Order.basketItems.map((basketItem,index)=>
        basketItem.price * basketItem.quantity).reduce((price,current)=>price+current);
  }
  completeOrder(){
    this.dialogService.openDialog({
  componentType:CompleteOrderDialogComponent,
  data:CompleteOrderState.Yes,
  afterClosed:async ()=>{
    this.spinner.show(SpinnerType.BallFussion)
    await this.orderService.completeOrder(this.data as string,()=>{
      this.spinner.hide(SpinnerType.BallFussion)
      this.toastrService.message("Order successfully completed.Email is sent to customer","Completed order",{
        toastrPosition:ToastrPosition.TopRight,
        toastrType:ToastrType.Success
      })
    })
    }
   })
  }
}

export enum OrderDetailDialogState{
  Close,
  OrderComplete
}

