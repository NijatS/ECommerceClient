import { Observable, firstValueFrom } from 'rxjs';
import { HttpClientService } from './../http-client.service';
import { Injectable } from '@angular/core';
import { List_Basket_Item } from '../../../contracts/basket/list-basket-item';
import { Add_Basket_Item } from '../../../contracts/basket/add-basket-item';
import { Update_Basket_Item } from '../../../contracts/basket/update-basket-item';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private httpClientService:HttpClientService) { }
  async get(): Promise<List_Basket_Item[]>{
    const obs: Observable<List_Basket_Item[]> = this.httpClientService.get({
      controller:"baskets",
    })
    return await firstValueFrom(obs)
  }
  async add(basketItem:Add_Basket_Item){
     const obs =  this.httpClientService.post({
         controller:"baskets"
       },basketItem)
      await firstValueFrom(obs)
  }
  async put(product:Update_Basket_Item){
    const obs =  this.httpClientService.put({
      controller:"baskets"
    },product)
   await firstValueFrom(obs)
  }
  async delete(basketItemId:string){
    const obs =  this.httpClientService.delete({
      controller:"baskets",
    },basketItemId)
   await firstValueFrom(obs)
  }

}
