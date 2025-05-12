import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  resetPasswordForm:FormGroup;
  token:string;
  constructor(private readonly fb:FormBuilder,private readonly route:ActivatedRoute,private readonly router:Router,private readonly authService:AuthService) {
    this.resetPasswordForm = fb.group({
      newPassword:['',Validators.required],
      confirmPassword:['',Validators.required]
    })
    this.token = route.snapshot.params['reset-token'];
  }

  onSubmit():void{
    if(this.resetPasswordForm.valid){
      const password = this.resetPasswordForm.controls['newPassword'].value;
      this.authService.resetPassword(password,this.token).subscribe(()=>{
      })
      this.router.navigate(['/login']);
    }
  }
}
