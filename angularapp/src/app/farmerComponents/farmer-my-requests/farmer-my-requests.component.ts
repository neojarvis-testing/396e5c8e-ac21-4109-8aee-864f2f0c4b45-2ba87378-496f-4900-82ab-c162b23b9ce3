import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-farmer-my-requests',
  templateUrl: './farmer-my-requests.component.html',
  styleUrls: ['./farmer-my-requests.component.css']
})
export class FarmerMyRequestsComponent implements OnInit {

  requests: any[] = [];
  requestIdToDelete: string | null = null;
  searchTerm:string='';
  paginatedChemicalRequests:any[] = [];
  currentPage = 1;  
  itemsPerPage = 5;
  totalPages = 1;
  filteredRequests:any[] = [];
  userId:string='';
  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('user')).id;
    this.getRequests();
  }

  getRequests(): void {
    this.requestService.getRequestsByUserId(this.userId).subscribe(
      (data) => {
        this.requests = data;
        this.totalPages = Math.ceil((data.totalCount || this.requests.length) / this.itemsPerPage);
        this.filteredRequests = this.requests;
      },
      (error) => {
        console.error('Error fetching requests', error);
      }
    );
  }

  get paginatedRequests():any[]{
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredRequests.slice(start,end);
  }

  openDeleteModal(requestId: string): void {
    this.requestIdToDelete = requestId;
    const deleteModal = new Modal(document.getElementById('deleteModal')!);
    deleteModal.show();
  }

  confirmDelete(): void {
    if (this.requestIdToDelete) {
      this.requestService.deleteRequest(this.requestIdToDelete).subscribe(
        () => {
          this.requests = this.requests.filter(request => request._id !== this.requestIdToDelete);
          console.log('Request deleted successfully');
          this.requestIdToDelete = null;
          const deleteModal = Modal.getInstance(document.getElementById('deleteModal')!);
          deleteModal.hide();
        },
        (error) => {
          console.error('Error deleting request', error);
        }
      );
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

