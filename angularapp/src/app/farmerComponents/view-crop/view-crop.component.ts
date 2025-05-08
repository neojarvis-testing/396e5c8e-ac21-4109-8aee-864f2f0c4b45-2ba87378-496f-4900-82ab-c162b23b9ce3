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
  totalPages: number = 1;
  searchText: string = ''; // Connected to search pipe
  selectedCrop: any;
  cropToDeleteId: string | null = null;

  constructor(private cropService: CropService) {}

  ngOnInit(): void {
    this.loadCrops();
  }

  loadCrops(): void {
    this.cropService.getCropsByUserId('681c79051f44a6cf632b1fb6').subscribe(response => {
      this.crops = response;
      this.totalPages = response.totalPages;
      console.log(response);
    });
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageNumber = page;
      this.loadCrops();
    }
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

}
