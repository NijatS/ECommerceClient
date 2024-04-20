import { Injectable, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicLoadComponentService {

  constructor() { }

  async loadComponent(component:Component,viewContainerRef:ViewContainerRef){

    let _component : any = null;
    switch(component){
      case Component.BasketsComponent:
       _component = (await import("../../ui/components/baskets/baskets.component")).BasketsComponent
      break;
    }

    viewContainerRef.clear();
    return viewContainerRef.createComponent(_component)

  }
}

export enum Component{
  BasketsComponent,
}
