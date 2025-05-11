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
  paginatedRequests:any[] = [];
  currentPage = 1;  
  itemsPerPage = 5;
  totalPages = 1;
  filteredRequests:any[] = [];
  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
    this.getRequests();
  }

  getRequests(): void {
    this.requestService.getAllRequests().subscribe(
      (data) => {
        this.requests = data;

        console.log(this.requests);
      },
      (error) => {
        console.error('Error fetching requests', error);
      }
    );
  }

  editRequest(request: any): void {
    // Implement your edit logic here
    console.log('Edit request:', request);
    // You can navigate to an edit form or open a modal for editing
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
}

