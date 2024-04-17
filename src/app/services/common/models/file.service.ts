import { firstValueFrom } from 'rxjs';
import { HttpClientService } from './../http-client.service';
import { Injectable } from '@angular/core';
import { BaseUrl } from '../../../contracts/base_url';

@Injectable({
    providedIn: 'root'
  })
  export class FileService {

    constructor(private HttpClientService:HttpClientService){}
   async GetBaseStorageUrl(){
       const obs =  this.HttpClientService.get<BaseUrl>({
            controller:"files",
            action:"getBaseStorageUrl"
        })

       return await firstValueFrom(obs)
    }
  }