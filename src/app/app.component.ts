import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomerToastrService, ToastrPosition, ToastrType } from './services/ui/customer-toastr.service';
declare var $:any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ECommerceClient';
  constructor(){
  }
}
