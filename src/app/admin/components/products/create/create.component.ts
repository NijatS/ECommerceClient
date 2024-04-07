import { NgxSpinnerService } from 'ngx-spinner';
import { Create_Product } from './../../../../contracts/create_product';
import { ProductService } from './../../../../services/common/models/product.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import {  AlertifyService, MessagePositionEnum, MessageTypeEnum } from '../../../../services/admin/alertify.service';
import { FileUploadOptions } from '../../../../services/common/file-upload/file-upload.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent extends BaseComponent implements OnInit {
  constructor(spinner:NgxSpinnerService,private ProductService:ProductService,private alertify:AlertifyService){
    super(spinner)
  }
 ngOnInit(): void {
   
 }
 @Output() createdProduct: EventEmitter<Create_Product> = new EventEmitter();


 create(name:HTMLInputElement,stock:HTMLInputElement,price:HTMLInputElement){

  this.showSpinner(SpinnerType.BallFussion);
  const create_Product :Create_Product  = new Create_Product();
  create_Product.name = name.value;
  create_Product.stock = parseInt(stock.value);
  create_Product.price = parseFloat(price.value);

  
  this.ProductService.create(create_Product,()=>{
    this.hideSpinner(SpinnerType.BallFussion)
    this.alertify.message("Product Sucessfully added",{
      dismissOthers : false,
      messageType : MessageTypeEnum.Success,
      position : MessagePositionEnum.TopRight
    });
    this.createdProduct.emit(create_Product);
  }, errorMessage =>{
    this.hideSpinner(SpinnerType.BallFussion)
    this.alertify.message(errorMessage,{
      dismissOthers : false,
      messageType : MessageTypeEnum.Error,
      position : MessagePositionEnum.TopRight
    })
  }
  );
 }
}
