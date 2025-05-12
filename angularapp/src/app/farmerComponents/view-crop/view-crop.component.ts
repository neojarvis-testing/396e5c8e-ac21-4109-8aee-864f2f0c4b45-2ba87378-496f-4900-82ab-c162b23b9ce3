import { Component, OnInit } from '@angular/core';
import { CropService } from 'src/app/services/crop.service';

@Component({
  selector: 'app-view-crop',
  templateUrl: './view-crop.component.html',
  styleUrls: ['./view-crop.component.css']
})
export class ViewCropComponent implements OnInit {

  crops: any[] = [];
  pageNumber: number = 1;
  pageSize: number = 5; // Define the number of crops per page
  searchText: string = ''; // Connected to search pipe
  selectedCrop: any;
  cropToDeleteId: string | null = null;
  user:any = null;
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 1;
  filteredCrops:any[]=[];
  constructor(private readonly cropService: CropService) {}

  userId: string

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))    
    this.loadCrops();
  }

  loadCrops(): void {
    this.cropService.getCropsByUserId(this.user.id).subscribe(response => {
      this.crops = response;
      this.totalPages = Math.ceil((response.totalCount || this.crops.length) / this.itemsPerPage);
      this.filteredCrops = this.crops;
    });
  }

  get paginatedCrops():any{
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredCrops.slice(start, end);
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  viewCrop(cropId: string): void {
    this.cropService.getCropById(cropId).subscribe(crop => {
      this.selectedCrop = crop;
    });
  }

  confirmDelete(cropId: string): void {
    this.cropToDeleteId = cropId;
  }

  deleteCrop(): void {
    if (this.cropToDeleteId) {
      this.cropService.deleteCrop(this.cropToDeleteId).subscribe(() => {
        this.loadCrops();
      });
    }
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