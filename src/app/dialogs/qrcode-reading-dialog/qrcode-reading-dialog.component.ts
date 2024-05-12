import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QrCodeService } from '../../services/common/qr-code.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogService } from '../../services/common/dialog.service';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';

@Component({
  selector: 'app-qrcode-reading-dialog',
  templateUrl: './qrcode-reading-dialog.component.html',
  styleUrl: './qrcode-reading-dialog.component.scss'
})
export class QrcodeReadingDialogComponent extends BaseDialog<QrcodeReadingDialogComponent> implements OnInit,OnDestroy{

  constructor(dialogRef: MatDialogRef<QrcodeReadingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:  string,
  private dialogService:DialogService,
  private spinner:NgxSpinnerService,
private qrCodeService:QrCodeService){
    super(dialogRef)
  }

@ViewChild("scanner",{static:true}) scanner: NgxScannerQrcodeComponent
@ViewChild("txtStock",{static:true}) txtStock: ElementRef

  ngOnInit(): void {
    this.scanner.start();
  }
  ngOnDestroy(): void {
    this.scanner.stop();
  }
  onEvent(e){
   const jsonData = JSON.parse((e as{data:string}).data);
   const stockValue = (this.txtStock.nativeElement as HTMLInputElement).value;
   console.log(stockValue)
  }
}
