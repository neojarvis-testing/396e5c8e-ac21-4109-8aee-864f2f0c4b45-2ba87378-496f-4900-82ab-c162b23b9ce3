
import { HttpClient } from '@angular/common/http';
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

  constructor(private fb: FormBuilder, private agroChemicalService: AgrochemicalService, private router: Router) {
    this.agroForm = this.fb.group({
      name: [''],
      brand: [''],
      category: [''],
      description: [''],
      unit: [''],
      price: [''],
      image: [null]
    });
  }
  ngOnInit(): void {

  }

  onFileChange(event: any) {
    this.imageFile = event.target.files[0];
  }

  submitForm() {
    const formData = new FormData();

    formData.append('name', this.agroForm.get('name')?.value);
    formData.append('brand', this.agroForm.get('brand')?.value);
    formData.append('category', this.agroForm.get('category')?.value);
    formData.append('description', this.agroForm.get('description')?.value);
    formData.append('unit', this.agroForm.get('unit')?.value);
    formData.append('price', this.agroForm.get('price')?.value);  

  if(this.imageFile) {
    formData.append('image', this.imageFile);
  }

    this.agroChemicalService.addAgrochemical(formData).subscribe(() => {
    this.router.navigate(['/seller/view-agrochemical'])
  })
    
  }
}
