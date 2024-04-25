import { Create_Order } from './../../../contracts/order/create_order';
import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { List_Order } from '../../../contracts/order/list_order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClientService:HttpClientService) { }

  async create(order: Create_Order){
    const obs = this.httpClientService.post({
      controller:"orders"
    },order);

    await firstValueFrom(obs);

  }
  async getAllOrders(page = 0,size = 5,succesCallBack?,errorCalBack?){
    const obs :Observable<{totalCount:number;orders:List_Order[]}>= this.httpClientService.get({
      controller:"orders",
      queryString:`page=${page}&size=${size}`
    });
const promiseData = firstValueFrom(obs);
promiseData.then(value=>succesCallBack())
.catch(error=>errorCalBack(error))
   return await promiseData;
  }
}
