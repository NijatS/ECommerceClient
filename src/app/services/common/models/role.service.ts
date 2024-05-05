import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CustomerToastrService } from '../../ui/customer-toastr.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { List_Role } from '../../../contracts/role/list_role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClientService:HttpClientService,private CustomerToastrService:CustomerToastrService
  ) { }
async getRoles(page = 0,size = 5,succesCallBack?,errorCalBack?){

  const promiseDate =  this.httpClientService.get<{datas:List_Role[],totalCount:number}>({
    controller:"roles",
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

async create(name:string,succesCallBack?: any,errorCallBack?: any)
{
  const obs : Observable<any> =  this.httpClientService.post({
    controller:"roles"
  },{name:name})

  const promisData = firstValueFrom(obs) ;

   promisData.then(succesCallBack)
     .catch(errorCallBack);
  return await promisData as {succeeded:boolean};
}

}
