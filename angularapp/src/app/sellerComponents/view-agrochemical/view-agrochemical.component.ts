import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgrochemicalService } from 'src/app/services/agrochemical.service';

@Component({
  selector: 'app-view-agrochemical',
  templateUrl: './view-agrochemical.component.html',
  styleUrls: ['./view-agrochemical.component.css']
})
export class ViewAgrochemicalComponent implements OnInit {
  agrochemicals: any[] = [];
  paginatedAgrochemicals: any[] = [];
  selectedImage: string = '';
  selectedDeleteId: string = '';
  searchTerm: string = '';
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 1;
  sortOrder = 'asc';
  sortField = 'name';
  showImageModal = false;
  showDeleteModal = false;

  constructor(private agroService: AgrochemicalService, private router: Router) {}

  ngOnInit(): void {
    this.loadAgrochemicals();
  }

  loadAgrochemicals(): void {
    this.agroService.getAllAgrochemicals(this.currentPage, this.itemsPerPage, this.searchTerm, this.sortOrder, this.sortField)
      .subscribe(response => {
        this.agrochemicals = response.data || response;
        this.totalPages = Math.ceil((response.totalCount || this.agrochemicals.length) / this.itemsPerPage);
        this.paginatedAgrochemicals = this.agrochemicals;
      });
  }

  sortByField(field: string): void {
    this.sortField = field;
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.loadAgrochemicals();
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadAgrochemicals();
  }

  get totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }

  editAgrochemical(id: string): void {
    this.router.navigate(['/seller/agrochemical-form', id]);
  }

  confirmDelete(id: string): void {
    this.selectedDeleteId = id;
    this.showDeleteModal = true;
  }

  deleteAgrochemical(): void {
    this.agroService.deleteAgrochemical(this.selectedDeleteId).subscribe(() => {
      this.loadAgrochemicals();
      this.showDeleteModal = false;
    });
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
  }

  showImage(imageUrl: string): void {
    this.selectedImage = imageUrl;
    this.showImageModal = true;
  }

  closeImageModal(): void {
    this.showImageModal = false;
  }

  onSearch(): void {
    this.currentPage = 1;
    this.loadAgrochemicals();
  }
}
