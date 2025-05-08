import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CropService } from 'src/app/services/crop.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-crop-form',
  templateUrl: './crop-form.component.html',
  styleUrls: ['./crop-form.component.css']
})
export class CropFormComponent implements OnInit {
  cropForm: FormGroup;
  cropId: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private toastr: ToastrService, 
    private cropService: CropService, 
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId') || '';

    this.cropForm = this.fb.group({
      cropName: ['', Validators.required],
      cropType: ['', Validators.required],
      description: ['', Validators.required],
      plantingDate: ['', Validators.required],
      userId: [userId, Validators.required]
    });

    // Get crop ID from router
    this.route.paramMap.subscribe(params => {
      this.cropId = params.get('id');
      if (this.cropId) {
        this.loadCropData(this.cropId);
      }
    });
  }

  loadCropData(id: string) {
    this.cropService.getCropById(id).subscribe(
      crop => {
        this.cropForm.patchValue(crop);
      },
      error => {
        this.toastr.error('Failed to load crop data.', 'Error');
      }
    );
  }

  onSubmit() {
    if (this.cropForm.valid) {
      if (this.cropId) {
        // Update crop
        this.cropService.updateCrop(this.cropId, this.cropForm.value).subscribe(
          () => {
            this.toastr.success('Crop updated successfully!', 'Success');
            this.router.navigate(['/crops']); // Redirect after update
          },
          () => {
            this.toastr.error('Error updating crop.', 'Error');
          }
        );
      } else {
        // Add new crop
        this.cropService.addCrop(this.cropForm.value).subscribe(
          () => {
            this.toastr.success('Crop added successfully!', 'Success');
            this.router.navigate(['/crops']); // Redirect after add
          },
          () => {
            this.toastr.error('Error adding crop.', 'Error');
          }
        );
      }
    } else {
      this.toastr.error('Please fill out all required fields!', 'Error');
    }
  }
}