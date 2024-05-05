import { RoleService } from './../../../../services/common/models/role.service';
import { Component, ViewChild } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessagePositionEnum, MessageTypeEnum } from '../../../../services/admin/alertify.service';
import { DialogService } from '../../../../services/common/dialog.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { List_Role } from '../../../../contracts/role/list_role';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends BaseComponent {

  constructor(spinner:NgxSpinnerService,private roleService:RoleService
    ,private alertify:AlertifyService,private dialogService:DialogService){
    super(spinner)
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['name','edit',"delete"];
  dataSource : MatTableDataSource<List_Role> =null;
 
async getRoles(){
  this.showSpinner(SpinnerType.BallFussion)
  const allRoles : {datas :List_Role[],totalCount:number} = await  this.roleService.getRoles(this.paginator ? this.paginator.pageIndex:0,this.paginator? this.paginator.pageSize :5,()=>{
    this.hideSpinner(SpinnerType.BallFussion)
  },(errorMessage)=>{
    this.hideSpinner(SpinnerType.BallFussion)
    this.alertify.message(errorMessage,{
      dismissOthers : true,
      messageType : MessageTypeEnum.Error,
      position: MessagePositionEnum.TopRight
    })
  })


 this.dataSource = new MatTableDataSource<List_Role>(allRoles.datas)
 this.paginator.length = allRoles.totalCount;

}

async pageChanged(){
  await this.getRoles();
}
async ngOnInit() {
   await this.getRoles()
  }

}
