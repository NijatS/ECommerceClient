import { Component } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClientService } from '../../../services/common/http-client.service';

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
    this.showSpinner(SpinnerType.BallFussion);
    this.httpCLient.get({
      controller:"product",
    },"d7180d5b-304c-46c7-9d94-16bc71f83d18").subscribe(datas => console.log(datas))

   // this.httpCLient.post({controller:"product"},{name:"Iphone",stock:10,price:1500}).subscribe()
  }
}
