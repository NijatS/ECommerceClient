import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { BasketService } from '../../../services/common/models/basket.service';
import { List_Basket_Item } from '../../../contracts/basket/list-basket-item';

declare var $:any;
@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrl: './baskets.component.scss'
})
export class BasketsComponent extends BaseComponent implements OnInit {
  constructor(spinner:NgxSpinnerService,private basketService:BasketService){
    super(spinner)
  }
  basketItems:List_Basket_Item[];
  async ngOnInit() {
    this.showSpinner(SpinnerType.BallFussion)
   this.basketItems = await this.basketService.get();
   this.hideSpinner(SpinnerType.BallFussion)
  }
  async changeQuantity(object:any){
    this.showSpinner(SpinnerType.BallFussion)
   const basketItemId =  object.target.attributes["id"].value;
   const quantity:number = object.target.value;
   await this.basketService.put({
    basketItemId:basketItemId,
    quantity:quantity
   })
   this.hideSpinner(SpinnerType.BallFussion)
  }
  async removeBasketItem(basketItemId:string){
    this.showSpinner(SpinnerType.BallFussion);

   await this.basketService.delete(basketItemId);

   $("."+basketItemId).fadeOut(500,()=>{
    this.hideSpinner(SpinnerType.BallFussion)
   })
  }
}
