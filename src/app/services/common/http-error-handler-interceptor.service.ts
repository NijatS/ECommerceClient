import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'console';
import { Observable, catchError, of } from 'rxjs';
import { CustomerToastrService, ToastrPosition, ToastrType } from '../ui/customer-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService : CustomerToastrService,private spinner:NgxSpinnerService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        switch (error.status) {
          case HttpStatusCode.Unauthorized:
            this.toastrService.message("Bu islem ucun yetkili diyilsiniz","Yetkisiz islem!",{
              toastrType:ToastrType.Warning,
              toastrPosition: ToastrPosition.BottomRight
            })
            break;
          case HttpStatusCode.InternalServerError:
            this.toastrService.message("Sunucuya erisilmiyor","Sunucu hatasi!",{
              toastrType:ToastrType.Warning,
              toastrPosition: ToastrPosition.BottomRight
            })
            break;
          case HttpStatusCode.BadRequest:
            this.toastrService.message("Gecersiz istek yapildi","Gecersiz islem!",{
              toastrType:ToastrType.Warning,
              toastrPosition: ToastrPosition.BottomRight
            })
            break;
          case HttpStatusCode.NotFound:
            this.toastrService.message("Yaptiginiz istek bulunamadi","Bulunamadi!",{
              toastrType:ToastrType.Warning,
              toastrPosition: ToastrPosition.BottomRight
            })
            break;
          default:
            this.toastrService.message("Beklenmeyen bir hata meydana gelmisdir","Hata!",{
              toastrType:ToastrType.Warning,
              toastrPosition: ToastrPosition.BottomRight
            })
            break;
        }
        console.log("salam")
        this.spinner.hide(SpinnerType.SquareJellyBox) 
        return of(error);
      })
    );
  }

}
