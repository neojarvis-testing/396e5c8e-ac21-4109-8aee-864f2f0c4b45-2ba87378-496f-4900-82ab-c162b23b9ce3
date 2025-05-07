import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crop-form',
  templateUrl: './crop-form.component.html',
  styleUrls: ['./crop-form.component.css']
})
export class CropFormComponent implements OnInit {

  cropForm: FormGroup;

  constructor(private fb: FormBuilder, private toastr: ToastrService) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId') || ''; // Fetch userId

    this.cropForm = this.fb.group({
      cropName: ['', Validators.required],
      cropType: ['', Validators.required],
      description: ['', Validators.required],
      plantingDate: ['', Validators.required],
      userId: [userId, Validators.required]
    });
  }

  onSubmit() {
    if (this.cropForm.valid) {
      
      this.toastr.success('Crop added successfully!', 'Success');
    } else {
      this.toastr.error('Please fill out all required fields!', 'Error');
    }
  }

}
