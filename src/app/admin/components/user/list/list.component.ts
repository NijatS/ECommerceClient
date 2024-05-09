import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../../../../services/common/models/user.service';
import { AlertifyService, MessagePositionEnum, MessageTypeEnum } from '../../../../services/admin/alertify.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from '../../../../services/common/dialog.service';
import { List_User } from '../../../../contracts/users/list_user';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(spinner:NgxSpinnerService,private userService:UserService
    ,private alertify:AlertifyService,private dialogService:DialogService){
    super(spinner)
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['userName', 'fullName', 'email', 'twoFactor','role','delete'];
  dataSource : MatTableDataSource<List_User> =null;
 
async getUsers(){
  this.showSpinner(SpinnerType.BallFussion)
  const allUsers: {totalUserCount:number  ; users:List_User[]} = await  this.userService.getAllUsers(this.paginator ? this.paginator.pageIndex:0,this.paginator? this.paginator.pageSize :5,()=>{
    this.hideSpinner(SpinnerType.BallFussion)
  },(errorMessage)=>{
    this.hideSpinner(SpinnerType.BallFussion)
    this.alertify.message(errorMessage,{
      dismissOthers : true,
      messageType : MessageTypeEnum.Error,
      position: MessagePositionEnum.TopRight
    })
  })
 this.dataSource = new MatTableDataSource<List_User>(allUsers.users)
 this.paginator.length = allUsers.totalUserCount;

}

async pageChanged(){
  await this.getUsers();
}
async ngOnInit() {
   await this.getUsers()
  }
  

}
