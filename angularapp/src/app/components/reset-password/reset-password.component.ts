import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm:FormGroup;
  token:String;
  constructor(private fb:FormBuilder,private route:ActivatedRoute,private router:Router,private authService:AuthService) {
    this.resetPasswordForm = fb.group({
      newPassword:['',Validators.required],
      confirmPassword:['',Validators.required]
    })
    this.token = route.snapshot.params['reset-token'];
  }
  
  ngOnInit(): void {
    
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
