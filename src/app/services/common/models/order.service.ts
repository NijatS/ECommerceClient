import { Create_Order } from './../../../contracts/order/create_order';
import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom } from 'rxjs';

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
}
