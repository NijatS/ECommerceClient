import { DialogService } from './../dialog.service';
import { CustomerToastrService, ToastrPosition, ToastrType } from './../../ui/customer-toastr.service';
import { Component, Host, HostListener, Input } from '@angular/core';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AlertifyService, MessagePositionEnum, MessageTypeEnum } from '../../admin/alertify.service';
import { MatDialog } from '@angular/material/dialog';
import { FileDeleteState, FileUploadDialogComponent } from '../../../dialogs/file-upload-dialog/file-upload-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../../base/base.component';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {

  constructor(private hhtpClientService : HttpClientService,
    private alertifyService:AlertifyService,
    private customerToastrService:CustomerToastrService,
    private dialog:MatDialog,
    private spinner:NgxSpinnerService,
    private dialogService :DialogService
   ){}

  public files: NgxFileDropEntry[];

  @Input() options:Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData :FormData = new FormData();
    for(const file of files){
    (file.fileEntry as FileSystemFileEntry).file((_file:File)=>
    {
      fileData.append(_file.name,_file,file.relativePath)
    })
    }
this.dialogService.openDialog({
  componentType:FileUploadDialogComponent,
  data:FileDeleteState.Yes,
  afterClosed:()=>{
      this.spinner.show(SpinnerType.BallFussion)
      this.hhtpClientService.post({
        controller:this.options.controller,
        action:this.options.action,
        queryString:this.options.queryString,
        headers: new HttpHeaders({"responseType":"blob"})
      },fileData).subscribe(data=>{
        const msg = "Files uploaded successfully";
        if(this.options.isAdminPage){
          this.alertifyService.message(msg,{
            messageType:MessageTypeEnum.Success,
            position:MessagePositionEnum.TopRight
          })
        }
        else{
           this.customerToastrService.message(msg,"Success",{
            toastrType:ToastrType.Success,
            toastrPosition:ToastrPosition.TopRight
           })
        }
        this.spinner.hide(SpinnerType.BallFussion)
      },(errorResponse:HttpErrorResponse)=>{
        const msg = "There was a problem while downloading the files";
        this.spinner.hide(SpinnerType.BallFussion)
        if(this.options.isAdminPage){
          this.alertifyService.message(msg,{
            messageType:MessageTypeEnum.Error,
            position:MessagePositionEnum.TopRight
          })
        }
        else{
           this.customerToastrService.message(msg,"Error",{
            toastrType:ToastrType.Error,
            toastrPosition:ToastrPosition.TopRight
           })
        }
      })
  },
})

  
  }  
  
  // openDialog(afterClosed:any): void {
  //   const dialogRef = this.dialog.open(FileUploadDialogComponent, {
  //     width:'250px',
  //     data:DeleteState.Yes,
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if(result == FileDeleteState.Yes){
  //       afterClosed()
  //     }
  //   });
  // }
  
}

export class FileUploadOptions{
  controller?:string;
  action?:string;
  queryString?:string;
  explanation?:string;
  accept?:string;
  isAdminPage:boolean =false;
}
