import { Component, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss'
})
export class RoleComponent extends BaseComponent {
  
  constructor( spinner:NgxSpinnerService){
    super(spinner)
  }


  @ViewChild(ListComponent) ListComponents :ListComponent;
  createdRole(createdRole: string){
    this.ListComponents.getRoles()
  }

}
