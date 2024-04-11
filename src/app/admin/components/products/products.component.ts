import { Component, ViewChild } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClientService } from '../../../services/common/http-client.service';
import { Create_Product } from '../../../contracts/create_product';
import { ListComponent } from './list/list.component';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent extends BaseComponent {
  constructor( spinner:NgxSpinnerService,private httpCLient:HttpClientService){
    super(spinner)
  }
  ngOnInit(): void {
    this.spinner.show(SpinnerType.BallFussion)
  }
  @ViewChild(ListComponent) ListComponents :ListComponent;
  createdProduct(createdProduct: Create_Product){
    this.ListComponents.getProducts()
  }
}
