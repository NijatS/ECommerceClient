import { error } from 'node:console';
import { Create_Product } from '../../../contracts/create_product';
import { HttpClientService } from './../http-client.service';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from '../../../contracts/list_product';
import { firstValueFrom } from 'rxjs';
import { List_Product_Image } from '../../../contracts/list_product_image';

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
  async read(page = 0,size = 5,succesCallBack?,errorCalBack?){
   const promiseDate =  this.httpClientService.get<{totalCount:number  ;products:List_Product[]}>({
      controller:"products",
      queryString:`page=${page}&size=${size}`
    }).toPromise();
    
    promiseDate.then(
      d => succesCallBack()
    )
      .catch(
       (errorResponse: HttpErrorResponse) =>{
        errorCalBack(errorResponse.message)
       }
      );

    return await promiseDate;
  }
  async delete(id:string){
  const obs =   this.httpClientService.delete({
      controller:"products"
    },id);
   await firstValueFrom(obs);
  }
  async readImages(id:string,successCallBack?: ()=>void){
   const obs =  this.httpClientService.get<List_Product_Image[]>({
      action:"getProductImages",
      controller:"products",
    },id);
    const images: List_Product_Image[] =await firstValueFrom(obs);
    successCallBack()
     return images
  }

  async deleteImage(id:string,imageId:string,succesCallBack?:()=>void){
   const obs =  this.httpClientService.delete({
      action:"deleteProductImage",
      controller:"products",
      queryString:`imageId=${imageId}`
    },id)

    await firstValueFrom(obs);
    succesCallBack()
  }
}
