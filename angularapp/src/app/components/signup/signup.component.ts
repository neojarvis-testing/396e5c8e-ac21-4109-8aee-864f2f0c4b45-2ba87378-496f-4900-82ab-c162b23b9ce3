import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Modal } from 'bootstrap';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      password: [
        '', [
          Validators.required,
          Validators.minLength(8),
          this.strongPasswordValidator
        ]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  get controls(): { [key: string]: AbstractControl } {
    return this.signupForm.controls;
  }

  strongPasswordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value || '';
    const errors: any = {};

    if (!/[A-Z]/.test(value)) {
      errors.uppercase = true;
    }
    if (!/[a-z]/.test(value)) {
      errors.lowercase = true;
    }
    if (!/[0-9]/.test(value)) {
      errors.number = true;
    }
    if (!/[@$!%*?&]/.test(value)) {
      errors.special = true;
    }

    return Object.keys(errors).length ? errors : null;
  }


  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }
  
    this.authService.register(this.signupForm.value).subscribe({
      next: () => {
        const modalElement = document.getElementById('successModal');
        if (modalElement) {
          const modal = new Modal(modalElement);
          modal.show();
        }
      },
      error: (err) => {
        console.error('Registration failed:', err);
        // Optionally show an error message to the user
        alert('Registration failed. Please try again.');
      }
    });
  }
  

  navigateToLogin(): void {
    const modalElement = document.getElementById('successModal');
    if (modalElement) {
      const modalInstance = Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide(); //Hide the modal before navigating
      }
    }

    this.router.navigate(['/login']);
  }

}
