import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerToastrService } from '../../services/ui/customer-toastr.service';
import { DialogService } from '../../services/common/dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { QrCodeService } from '../../services/common/qr-code.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SpinnerType } from '../../base/base.component';

@Component({
  selector: 'app-qrcode-dialog',
  templateUrl: './qrcode-dialog.component.html',
  styleUrl: './qrcode-dialog.component.scss'
})
export class QrcodeDialogComponent extends BaseDialog<QrcodeDialogComponent> implements OnInit{

  constructor(dialogRef: MatDialogRef<QrcodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:  string,
  private dialogService:DialogService,private spinner:NgxSpinnerService,
  private domSanitizer:DomSanitizer,
private qrCodeService:QrCodeService){
    super(dialogRef)
  }
  qrCodeUrl:SafeUrl;
async ngOnInit() {
  this.spinner.show(SpinnerType.BallFussion)
  const qrCodeBlob =await this.qrCodeService.generateQRCode(this.data);
  const url:string = URL.createObjectURL(qrCodeBlob);
this.qrCodeUrl = this.domSanitizer.bypassSecurityTrustUrl(url)
this.spinner.hide(SpinnerType.BallFussion)
  
}
}
