import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-file-upload-dialog',
  templateUrl: './file-upload-dialog.component.html',
  styleUrl: './file-upload-dialog.component.scss'
})
export class FileUploadDialogComponent extends BaseDialog<FileUploadDialogComponent> {
 constructor( dialogRef: MatDialogRef<FileUploadDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: FileDeleteState){
    super(dialogRef)
  }
}


export enum FileDeleteState{
  Yes,
  No
}