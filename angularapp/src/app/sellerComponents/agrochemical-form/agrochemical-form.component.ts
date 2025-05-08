import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AgrochemicalService } from 'src/app/services/agrochemical.service';

@Component({
  selector: 'app-agrochemical-form',
  templateUrl: './agrochemical-form.component.html',
})
export class AgrochemicalFormComponent implements OnInit {
  agroForm!: FormGroup;
  isEditMode = false;
  imagePreview: string = '';
  imageRequired = false;
  agroId: string | null = null;
  showSuccessModal = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private agroService: AgrochemicalService
  ) {}

  ngOnInit(): void {
    this.agroForm = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      unit: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      imageUrl: ['']
    });

    this.agroId = this.route.snapshot.paramMap.get('id');
    if (this.agroId) {
      this.isEditMode = true;
      this.agroService.getAgrochemicalById(this.agroId).subscribe(data => {
        this.agroForm.patchValue(data);
        this.imagePreview = data.imageUrl;
      });
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file && ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.agroForm.patchValue({ imageUrl: this.imagePreview });
        this.imageRequired = false;
      };
      reader.readAsDataURL(file);
    } else {
      alert('Only JPG, JPEG, PNG files are allowed.');
    }
  }

  onSubmit(): void {
    if (this.agroForm.invalid || !this.imagePreview) {
      this.imageRequired = !this.imagePreview;
      this.agroForm.markAllAsTouched();
      return;
    }

    const data = { ...this.agroForm.value, imageUrl: this.imagePreview };

    if (this.isEditMode && this.agroId) {
      this.agroService.updateAgrochemical(this.agroId, data).subscribe(() => {
        this.showSuccessModal = true;
      });
    } else {
      this.agroService.addAgrochemical(data).subscribe(() => {
        this.showSuccessModal = true;
      });
    }
  }

  navigateToView(): void {
    this.showSuccessModal = false;
    this.router.navigate(['/seller/view-agrochemical']);
  }

  goBack(): void {
    this.router.navigate(['/seller/view-agrochemical']);
  }
}
