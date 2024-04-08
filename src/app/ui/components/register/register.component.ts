import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
constructor(private formBuilder:FormBuilder){}
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
   })
 }

 get component(){
  return this.frm.controls;
 }
 submitted: boolean = false;
 onSubmit(data){
  console.log(this.component)
  this.submitted = true;
  if(this.frm.invalid){
    return;
  }
 }
}
