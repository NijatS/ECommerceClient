import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { ProductService } from '../../../../services/common/models/product.service';
import {  NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessagePositionEnum, MessageTypeEnum } from '../../../../services/admin/alertify.service';
import { DialogService } from '../../../../services/common/dialog.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { List_Product } from '../../../../contracts/list_product';
import { SelectProductImageDialogComponent } from '../../../../dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { List_Order } from '../../../../contracts/order/list_order';
import { OrderService } from '../../../../services/common/models/order.service';
import { OrderDetailDialogComponent } from '../../../../dialogs/order-detail-dialog/order-detail-dialog.component';

declare var $:any; 
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent  extends BaseComponent implements OnInit{
  constructor(spinner:NgxSpinnerService,private orderService:OrderService
    ,private alertify:AlertifyService,private dialogService:DialogService){
    super(spinner)
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['orderCode', 'userName', 'totalPrice', 'createdDate','viewdetail','delete'];
  dataSource : MatTableDataSource<List_Order> =null;
 
async getOrders(){
  this.showSpinner(SpinnerType.BallFussion)
  const allOrders : {totalCount:number  ; orders:List_Order[]} = await  this.orderService.getAllOrders(this.paginator ? this.paginator.pageIndex:0,this.paginator? this.paginator.pageSize :5,()=>{
    this.hideSpinner(SpinnerType.BallFussion)
  },(errorMessage)=>{
    this.hideSpinner(SpinnerType.BallFussion)
    this.alertify.message(errorMessage,{
      dismissOthers : true,
      messageType : MessageTypeEnum.Error,
      position: MessagePositionEnum.TopRight
    })
  })
 this.dataSource = new MatTableDataSource<List_Order>(allOrders.orders)
 this.paginator.length = allOrders.totalCount;

}
addProductImages(id:string){
  this.dialogService.openDialog({
    componentType:SelectProductImageDialogComponent,
    data:id
  })
}
async pageChanged(){
  await this.getOrders();
}
async ngOnInit() {
   await this.getOrders()
  }
  showDetail(id:string){
    this,this.dialogService.openDialog({
      componentType:OrderDetailDialogComponent,
      data: id,
      options:{
        width:'750px'
      }
    })

  }


}
