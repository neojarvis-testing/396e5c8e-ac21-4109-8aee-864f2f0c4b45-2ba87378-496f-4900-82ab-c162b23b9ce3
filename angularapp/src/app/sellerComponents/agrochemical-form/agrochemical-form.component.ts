// import { Component, OnInit } from '@angular/core';
// import { FormGroup } from '@angular/forms';

// @Component({
//   selector: 'app-agrochemical-form',
//   templateUrl: './agrochemical-form.component.html',
//   styleUrls: ['./agrochemical-form.component.css']
// })
// export class AgrochemicalFormComponent implements OnInit {
//   agrochemicalForm!: FormGroup
// agrochemicalId: any;
//   constructor() { }

//   ngOnInit(): void {
//   }

//   addOrUpdateAgrochemical(){}

//   handleFileChange($event:any){}
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { Agrochemical } from 'src/app/models/agrochemical.model';
import { AgrochemicalService } from 'src/app/services/agrochemical.service';

@Component({
  selector: 'app-agrochemical-form',
  templateUrl: './agrochemical-form.component.html',
  styleUrls: ['./agrochemical-form.component.css']
})
export class AgrochemicalFormComponent implements OnInit {
  agrochemicalForm!: FormGroup;
  coverImageBase64: string = '';
  agrochemicalId: string | null = null;
  // agrochemicals: Agrochemical[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private agrochemicalService: AgrochemicalService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.agrochemicalForm = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      unit: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    this.agrochemicalId = this.route.snapshot.params['id'];
    if (this.agrochemicalId) {
      this.loadAgrochemicalDetails(this.agrochemicalId);
    }
  }

  loadAgrochemicalDetails(agrochemicalId: string): void {
    this.agrochemicalService.getAgrochemicalById(agrochemicalId).subscribe((agrochemical) => {
      this.agrochemicalForm.patchValue(agrochemical);
      this.coverImageBase64 = agrochemical.imageUrl;
    });
  }

  handleFileChange(event: any): void {
    const file = event.target.files[0];
    if (file && (file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/jpeg')) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.coverImageBase64 = reader.result as string;
        this.agrochemicalForm.patchValue({ imageUrl: this.coverImageBase64 });
      };
    } else {
      alert('Only JPG, JPEG and PNG files are allowed.');
    }
  }

  addOrUpdateAgrochemical(): void {
    if (this.agrochemicalForm.invalid) {
      alert('Please fill all required fields.');
      return;
    }
    const agrochemicalData = { ...this.agrochemicalForm.value, imageUrl: this.coverImageBase64, agrochemicalId: this.agrochemicalId || Math.floor(Math.random() * 10000).toString() };
    if (this.agrochemicalId) {
      this.agrochemicalService.updateAgrochemical(this.agrochemicalId, agrochemicalData).subscribe(() => {
        this.router.navigate(['admin/agrochemicals']);
      });
    } else {
      this.agrochemicalService.addAgrochemical(agrochemicalData).subscribe(() => {
        this.router.navigate(['admin/agrochemicals']);
      });
    }
  }
}
