import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
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
  selectedChemical: any; 
  farmerId:string='';
  filteredChemicals:any[]=[];
  constructor(private readonly agroService: AgrochemicalService, private readonly router: Router) {}

  ngOnInit(): void {
    this.loadAgrochemicals();
  }

  loadAgrochemicals(): void {
    this.agroService.getAllAgrochemicals(this.currentPage, this.itemsPerPage, this.searchTerm, this.sortOrder, this.sortField)
      .subscribe(response => {
        this.agrochemicals = response.agrochemicals;
        this.totalPages = Math.ceil(( this.agrochemicals.length) / this.itemsPerPage);
        this.filteredChemicals = this.agrochemicals;
      });
  }

  get paginatedChemicals(): any[]{
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredChemicals.slice(start,end);
  }

  sortByField(field: string): void {
    this.sortField = field;
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.loadAgrochemicals();
  }

  // get totalPagesArray(): number[] {
  //   return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  // }

  editAgrochemical(id: string): void {
    this.router.navigate(['/seller/agrochemical-form', id]);
  }

  confirmDelete(id: string): void {
    this.selectedDeleteId = id;
  }

  deleteAgrochemical(): void {
    this.agroService.deleteAgrochemical(this.selectedDeleteId).subscribe(() => {
      this.loadAgrochemicals();      
    });
  } 

  showImage(imageUrl: string): void {
    this.selectedChemical = null;
    this.selectedImage = imageUrl;
    const chemical$ = this.agroService.getAgrochemicalById(this.selectedImage);
    const file$ =  this.agroService.getFileByImageId(this.selectedImage);
    combineLatest([chemical$,file$]).subscribe(([productResponse,fileResponse]) => {
      this.selectedChemical = { ...productResponse, image: fileResponse }
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
