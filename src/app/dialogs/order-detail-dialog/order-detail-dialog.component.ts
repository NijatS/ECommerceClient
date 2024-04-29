import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from '../../services/common/models/order.service';
import { Single_Order } from '../../contracts/order/single_order';

@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrl: './order-detail-dialog.component.scss'
})
export class OrderDetailDialogComponent extends BaseDialog<OrderDetailDialogComponent> implements OnInit {

  constructor(dialogRef: MatDialogRef<OrderDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderDetailDialogState | string,
  private orderService:OrderService){
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
}

export enum OrderDetailDialogState{
  Close,
  OrderComplete
}
