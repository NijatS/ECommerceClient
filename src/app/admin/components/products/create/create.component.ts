import { NgxSpinnerService } from 'ngx-spinner';
import { Create_Product } from './../../../../contracts/create_product';
import { ProductService } from './../../../../services/common/models/product.service';
import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { AlertifyOptions, AlertifyService, MessagePositionEnum, MessageTypeEnum } from '../../../../services/admin/alertify.service';

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

 create(name:HTMLInputElement,stock:HTMLInputElement,price:HTMLInputElement){
  this.spinner.show(SpinnerType.BallFussion);
  const create_Product :Create_Product  = new Create_Product();
  create_Product.name = name.value;
  create_Product.stock = parseInt(stock.value);
  create_Product.price = parseFloat(price.value);

  
  this.ProductService.create(create_Product,()=>{
    this.spinner.hide(SpinnerType.BallFussion)
    this.alertify.message("Product Sucessfully added",{
      dismissOthers : true,
      messageType : MessageTypeEnum.Success,
      position : MessagePositionEnum.TopRight
    })
  });
 }
}
