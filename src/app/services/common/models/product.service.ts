import { error } from 'node:console';
import { Create_Product } from '../../../contracts/create_product';
import { HttpClientService } from './../http-client.service';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService:HttpClientService) { }
  create(product:Create_Product,succesCallBack?: any,errorCallBack?: any)
  {
    this.httpClientService.post({
      controller:"products"
    },product).subscribe(result =>{
      succesCallBack();
    },(errorResponse:HttpErrorResponse) =>{
      const _error: Array<{key:string,value:Array<string>}> = errorResponse.error
      console.log(_error);
      let message = "";
      _error.forEach((v,index)=>{
        v.value.forEach((_v,_index)=>{
          message +=`${_v}<br>`
        })
      })
           errorCallBack(message)
    });
  }

}
