import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  CustomerToastrService,
  ToastrPosition,
  ToastrType,
} from '../../services/ui/customer-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
export const authGuard: CanActivateFn = (route, state) => {
  inject(NgxSpinnerService).show(SpinnerType.SquareJellyBox);

  const jwtHelper = new JwtHelperService();
  

  const token: string = localStorage.getItem('accessToken');

  let isExpired = false;
  try {
    isExpired = jwtHelper.isTokenExpired(token);
  } catch {
    isExpired = true;
  }

  if (!token || isExpired) {
    inject(Router).navigate(["login"], {
      queryParams: { returnUrl: state.url },
    });

    inject(CustomerToastrService).message(
      'Firstly, You must login',
      'Unauthorize access',
      {
        toastrType: ToastrType.Warning,
        toastrPosition: ToastrPosition.TopRight,
      }
    );
  }
  inject(NgxSpinnerService).hide(SpinnerType.SquareJellyBox);

  return true;
};
