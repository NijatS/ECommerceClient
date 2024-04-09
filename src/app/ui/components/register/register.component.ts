import { CustomerToastrService, ToastrPosition, ToastrType } from './../../../services/ui/customer-toastr.service';
import { UserService } from './../../../services/common/models/user.service';
import { User } from './../../../entities/user';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Register_User } from '../../../contracts/users/register_user';
import { BaseComponent } from '../../../base/base.component';
import {  NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent extends BaseComponent implements OnInit {
constructor(private formBuilder:FormBuilder,private UserService :UserService,private CustomerToastrService:CustomerToastrService,spinner:NgxSpinnerService){
  super(spinner)
}
 frm:FormGroup

 ngOnInit(): void {
   this.frm = this.formBuilder.group({
    fullName:["",
    [Validators.required,
      Validators.maxLength(50),
      Validators.minLength(3)]],
    userName:["",
    [Validators.required,
      Validators.maxLength(50),
      Validators.minLength(3)]],
    email:["",
    [Validators.required,
      Validators.maxLength(250),
      Validators.email]],
    password:["",[
      Validators.required
    ]],
    confirmPassword:["",[
      Validators.required
    ]],
   },{validators:(group:AbstractControl):ValidationErrors | null=>{
    let password= group.get("password").value;
    let confirmPassword= group.get("confirmPassword").value;
    return password === confirmPassword ?null : {notSame:true}
   }})
 }

 get component(){
  return this.frm.controls;
 }
 submitted: boolean = false;
 async onSubmit(user:User){
  this.submitted = true;

  if(this.frm.invalid){
    return;
  }
 const result : Register_User  =  await this.UserService.register(user);
 if(result.succeded){
  this.CustomerToastrService.message(result.message,"Success",{
    toastrPosition : ToastrPosition.TopRight,
    toastrType: ToastrType.Success
  })
}
  else{
    this.CustomerToastrService.message(result.message,"Error",{
      toastrPosition : ToastrPosition.TopRight,     
     toastrType: ToastrType.Error
    })
}
 }


}
