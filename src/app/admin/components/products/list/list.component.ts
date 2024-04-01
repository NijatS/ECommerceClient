import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { List_Product } from '../../../../contracts/list_product';
import { ProductService } from '../../../../services/common/models/product.service';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessagePositionEnum, MessageTypeEnum } from '../../../../services/admin/alertify.service';
import { MatPaginator } from '@angular/material/paginator';

declare var $:any; 
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(spinner:NgxSpinnerService,private productService:ProductService
    ,private alertify:AlertifyService){
    super(spinner)
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate','updatedDate','edit',"delete"];
  dataSource : MatTableDataSource<List_Product> =null;
 
async getProducts(){
  this.showSpinner(SpinnerType.BallFussion)
  const allProducts : {totalCount:number  ; products:List_Product[]} = await  this.productService.read(this.paginator ? this.paginator.pageIndex:0,this.paginator? this.paginator.pageSize :5,()=>{
    this.hideSpinner(SpinnerType.BallFussion)
  },(errorMessage)=>{
    this.hideSpinner(SpinnerType.BallFussion)
    this.alertify.message(errorMessage,{
      dismissOthers : true,
      messageType : MessageTypeEnum.Error,
      position: MessagePositionEnum.TopRight
    })
  })
 this.dataSource = new MatTableDataSource<List_Product>(allProducts.products)
 this.paginator.length = allProducts.totalCount;

}
async pageChanged(){
  await this.getProducts();
}
async ngOnInit() {
   await this.getProducts()
  }
}
