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
import { AuthService, _isAuthenticated } from '../../services/common/auth.service';
export const authGuard: CanActivateFn = (route, state) => {
  inject(NgxSpinnerService).show(SpinnerType.SquareJellyBox);
  inject(AuthService).identityCheck()

  if (!_isAuthenticated) {
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
