import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AgrochemicalService } from 'src/app/services/agrochemical.service';

@Component({
  selector: 'app-agrochemical-form',
  templateUrl: './agrochemical-form.component.html',
})
export class AgrochemicalFormComponent implements OnInit {
  agroForm: FormGroup;
  imageFile: File | null = null;
  isEditMode = false;
  agrochemicalId: string | null = null;
  existingImage: any;

  constructor(
    private readonly fb: FormBuilder,
    private readonly agroChemicalService: AgrochemicalService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.agroForm = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      category: ['', Validators.required],
      description: [''],
      unit: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      image: [null]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.agrochemicalId = params.get('id');
      if (this.agrochemicalId) {
        this.isEditMode = true;
        this.loadAgrochemicalData(this.agrochemicalId);
      }
    });
  }

  loadAgrochemicalData(id: string) {
    this.agroChemicalService.getAgrochemicalById(id).subscribe({
      next: (agrochemical) => {
        this.agroForm.patchValue(agrochemical);
        this.existingImage = agrochemical.image;
      },
      error: (err) => console.error('Error loading agrochemical:', err)
    });
  }

  onFileChange(event: any) {
    this.imageFile = event.target.files[0];
  }

  submitForm() {
    if (this.agroForm.invalid) return;

    const formData = new FormData();
    formData.append('name', this.agroForm.get('name')?.value);
    formData.append('brand', this.agroForm.get('brand')?.value);
    formData.append('category', this.agroForm.get('category')?.value);
    formData.append('description', this.agroForm.get('description')?.value);
    formData.append('unit', this.agroForm.get('unit')?.value);
    formData.append('price', this.agroForm.get('price')?.value);

    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }

    if (this.isEditMode && this.agrochemicalId) {
      this.agroChemicalService.updateAgrochemical(this.agrochemicalId, formData)
        .subscribe(() => this.redirectAfterSubmit());
    } else {
      this.agroChemicalService.addAgrochemical(formData)
        .subscribe(() => this.redirectAfterSubmit());
    }
  }

  private redirectAfterSubmit() {
    this.router.navigate(['/seller/view-agrochemical']);
  }
}