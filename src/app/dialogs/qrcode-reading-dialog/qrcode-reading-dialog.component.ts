import { ListComponent } from './../../admin/components/products/list/list.component';
import { ProductService } from './../../services/common/models/product.service';
import { MessagePositionEnum } from './../../services/admin/alertify.service';
import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QrCodeService } from '../../services/common/qr-code.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogService } from '../../services/common/dialog.service';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';
import { MatButton } from '@angular/material/button';
import { CustomerToastrService, ToastrPosition, ToastrType } from '../../services/ui/customer-toastr.service';
import { SpinnerType } from '../../base/base.component';

declare var $:any;

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
 private toastrService:CustomerToastrService,
private productService:ProductService){
    super(dialogRef)
  }

@ViewChild("scanner",{static:true}) scanner: NgxScannerQrcodeComponent
@ViewChild("txtStock",{static:true}) txtStock: ElementRef;
count  = 0;

  ngOnInit(): void {
    this.scanner.start();
  }
  ngOnDestroy(): void {
    this.scanner.stop();
  }
  async onEvent(e){
    this.spinner.show(SpinnerType.BallFussion)
    const data = e[0].value;
    if(data != null && data !=""){

      const jsonData = JSON.parse(data);
      const stockValue = (this.txtStock.nativeElement as HTMLInputElement).value;
     if(this.count == 0){
      this.count++;
      await this.productService.updateStockQrCodeToProduct(jsonData.Id,parseInt(stockValue),()=>{
        console.log(this.dialogRef.close)
        $("#btnClose").click();
        this.toastrService.message(`${jsonData.Name} stock count updated`,"Stock Update",{
          toastrType:ToastrType.Success,
          toastrPosition:ToastrPosition.TopRight,
        })
        this.spinner.hide(SpinnerType.BallFussion)
      })
    }
    }
    this.spinner.hide(SpinnerType.BallFussion)

  }
}
