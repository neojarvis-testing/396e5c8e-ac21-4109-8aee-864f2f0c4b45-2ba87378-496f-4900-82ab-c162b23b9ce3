import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CropService } from 'src/app/services/crop.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-crop-form',
  templateUrl: './crop-form.component.html',
  styleUrls: ['./crop-form.component.scss']
})
export class CropFormComponent implements OnInit {
  cropForm: FormGroup;
  cropId: string | null = null;
  today: string = new Date().toISOString().split('T')[0];
  cropTypes = ['Cereal', 'Fruit', 'Vegetable', 'Legume', 'Root', 'Tuber', 'Oilseed', 'Others'];
  errors: any = {};

  constructor(
    private readonly fb: FormBuilder,
    private cropService: CropService,
    private route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user')) || '';
    const userId = user.id
    this.cropForm = this.fb.group({
      cropName: ['', Validators.required],
      cropType: ['', Validators.required],
      description: ['', Validators.required],
      plantingDate: ['', Validators.required],
      userId: [userId, Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      this.cropId = params.get('id');
      
      if (this.cropId) {
        this.loadCropData(this.cropId);
      }
    });
  }

  loadCropData(id: string) {
    this.cropService.getCropById(id).subscribe(crop => {
      this.cropForm.patchValue(crop);
    });
  }

  onSubmit() {
    if (this.cropForm.valid) {
      if (this.cropId) {
        // Update crop
        this.cropService.updateCrop(this.cropId, this.cropForm.value).subscribe(
          () => {
            console.log('Crop updated successfully!');
            this.router.navigate(['/farmer/view-crop']); // Redirect after update
          },
          () => {
            console.error('Error updating crop.');
          }
        );
      } else {
        // Add new crop
        this.cropService.addCrop(this.cropForm.value).subscribe(
          () => {
            console.log('Crop added successfully!');
            this.router.navigate(['/farmer/view-crop']); // Redirect after add
          },
          () => {
            console.error('Error adding crop.');
          }
        );
      }
    } else {
      console.error('Please fill out all required fields!');
    }
  }

  navigateToViewCrop() {
    this.router.navigate(['/farmer/view-crop']);
  }
}
