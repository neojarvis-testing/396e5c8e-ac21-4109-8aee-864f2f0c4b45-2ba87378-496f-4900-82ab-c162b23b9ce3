import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { AgrochemicalService } from 'src/app/services/agrochemical.service';
import { CropService } from 'src/app/services/crop.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-farmer-view-agrochemical',
  templateUrl: './farmer-view-agrochemical.component.html',
  styleUrls: ['./farmer-view-agrochemical.component.css']
})
export class FarmerViewAgrochemicalComponent implements OnInit {

  page: number = 1;
  pageSize: number = 5;
  searchValue: string = '';
  sortOrder: string = '';
  sortBy: string = '';
  agrochemicals: any[] = [];
  selectedAgrochemical: any = null;
  requestForm: FormGroup;
  farmerCrops: any[] = [];
  selectedCropId: any = null;
  farmerId: string = '';
  filteredChemicals: any[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 1;
  constructor(private agrochemicalService: AgrochemicalService, private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly cropService: CropService,
    private readonly requestService: RequestService) {
    this.requestForm = fb.group({
      cropId: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]]
    })
  }

  ngOnInit(): void {
    this.loadAgrochemicals();
    this.farmerId = JSON.parse(localStorage.getItem('user')).id || '';
  }
  loadAgrochemicals() {
    this.agrochemicalService.getAllAgrochemicals(this.page, this.pageSize, this.searchValue, this.sortOrder, this.sortBy).subscribe((res) => {
      this.agrochemicals = res.agrochemicals;
      this.totalPages = Math.ceil((this.agrochemicals.length) / this.itemsPerPage);
      this.filteredChemicals = this.agrochemicals;
    })
  }

  get paginatedChemicals(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredChemicals.slice(start, end);
  }

  submitRequest() {
    if (this.requestForm.valid) {
      console.log(this.selectedAgrochemical);
      const agroChemicalId = this.selectedAgrochemical._id;
      const status = 'pending';
      const requestDate = Date.now();
      const requestData = {
        status,
        requestDate,
        agroChemicalId,
        userId: this.farmerId,
        ...this.requestForm.value
      }
      this.requestService.addRequest(requestData).subscribe(() => {
        this.router.navigate(['/farmer/my-requests']);
      })
    }
  }

  loadFarmerCrops(agro: any) {
    this.selectedAgrochemical = agro;
    this.cropService.getCropsByUserId(this.farmerId).subscribe(response => {
      this.farmerCrops = response;
    });
  }

  showImage(imageUrl: string): void {
    this.selectedAgrochemical = imageUrl;
    const chemical$ = this.agrochemicalService.getAgrochemicalById(this.selectedAgrochemical);
    const file$ = this.agrochemicalService.getFileByImageId(this.selectedAgrochemical);
    combineLatest([chemical$, file$]).subscribe(([productResponse, fileResponse]) => {
      this.selectedAgrochemical = { ...productResponse, image: fileResponse }
    })
  }

  nextPage():void{
    if(this.currentPage < this.totalPages){
      this.currentPage++;
      this.renderTable();
    }
  }
  renderTable():void{
    if(this.currentPage > this.totalPages){
      this.currentPage = this.totalPages;
    }
  }

  prevPage():void{
    if(this.currentPage > 1){
      this.currentPage--;
      this.renderTable();
    }
  }
}
