import { AuthorizationEndpoinService } from './../../services/common/models/authorization-endpoin.service';
import { RoleService } from './../../services/common/models/role.service';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { List_Role } from '../../contracts/role/list_role';
import { MatSelectionList } from '@angular/material/list';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';

@Component({
  selector: 'app-authorize-menu-dialog',
  templateUrl: './authorize-menu-dialog.component.html',
  styleUrl: './authorize-menu-dialog.component.scss'
})
export class AuthorizeMenuDialogComponent extends BaseDialog<AuthorizeMenuDialogComponent> implements OnInit {
  constructor(dialogRef:MatDialogRef<AuthorizeMenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AuthorizeMenuState | any, private roleService:RoleService,
  private authorizationEndpoinService:AuthorizationEndpoinService,
private spinner:NgxSpinnerService){
    super(dialogRef)

  }
  roles:{datas:List_Role[],totalCount:number};

  assignedRoles:Array<string> ;
  listRoles:{name:string,selected:boolean}[];

  async ngOnInit() {
    this.assignedRoles = await this.authorizationEndpoinService.getRolesToEndpoint(this.data.code,this.data.menuName) ;
    this.roles = await this.roleService.getRoles(-1,-1);
    this.listRoles = this.roles.datas.map((r:any)=>{
      return{
      name:r.name,
      selected: (this.assignedRoles?.indexOf(r.name) > -1)
      }
    });
  }
  async assignRoles(rolesComponent: MatSelectionList){
    const roles:string[] = rolesComponent.selectedOptions.selected.map(r=>r.value);
    this.spinner.show(SpinnerType.BallFussion)
   await this.authorizationEndpoinService.assignRoleEndpoint(roles,this.data.code,
      this.data.menuName,()=>{
        this.spinner.hide(SpinnerType.BallFussion)
      },() =>{

      }
    )
  }



}


export enum AuthorizeMenuState{
  Yes,
  No
}

