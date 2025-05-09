// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-seller-view-requests',
//   templateUrl: './seller-view-requests.component.html',
//   styleUrls: ['./seller-view-requests.component.css']
// })
// export class SellerViewRequestsComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-seller-view-requests',
  templateUrl: './seller-view-requests.component.html',
  styleUrls: ['./seller-view-requests.component.css']
})
export class SellerViewRequestsComponent implements OnInit {
  requests: any[] = [];
  filteredRequests: any[] = [];
  selectedRequest: any = null;
  searchTerm: string = '';
  statusFilter: string = '';
  showLogoutModal: boolean = false;

  constructor(
    private requestService: RequestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.requestService.getAllRequests().subscribe((data) => {
      this.requests = data;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.filteredRequests = this.requests.filter((req) => {
      const matchesSearch = req.chemicalName.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.statusFilter ? req.status === this.statusFilter : true;
      return matchesSearch && matchesStatus;
    });
  }

  updateStatus(request: any, status: string): void {
    const updatedRequest = { ...request, status };
    this.requestService.updateRequest(request.id, updatedRequest).subscribe(() => {
      this.loadRequests();
    });
  }

  openDetails(request: any): void {
    this.selectedRequest = request;
  }

  closeDetails(): void {
    this.selectedRequest = null;
  }

  confirmLogout(): void {
    this.showLogoutModal = true;
  }

  logout(): void {
    this.showLogoutModal = false;
    this.router.navigate(['/login']);
  }
}
