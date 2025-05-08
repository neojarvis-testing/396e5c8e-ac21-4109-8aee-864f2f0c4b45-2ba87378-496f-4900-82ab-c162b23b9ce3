import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-view-requests',
  templateUrl: './seller-view-requests.component.html',
  styleUrls: ['./seller-view-requests.component.css']
})
export class SellerViewRequestsComponent implements OnInit {
  requests = [
    { username: 'farmer', chemicalName: 'Roundup', brand: 'Bayer', quantity: 333, date: '2024-06-12', status: 'Approved' },
    { username: 'farmer', chemicalName: 'Agad', brand: 'adama', quantity: 67, date: '2024-06-23', status: 'Rejected' },
    { username: 'farmer', chemicalName: 'demo name', brand: 'demo brand', quantity: 57, date: '2024-06-29', status: 'Pending' }
  ];

  statusFilter = 'All';
  searchText = '';

  constructor() {}

  ngOnInit(): void {}

  get filteredRequests() {
    return this.requests.filter(req =>
      (this.statusFilter === 'All' || req.status === this.statusFilter) &&
      Object.values(req).some(value =>
        value.toString().toLowerCase().includes(this.searchText.toLowerCase())
      )
    );
  }

  approveRequest(index: number) {
    this.requests[index].status = 'Approved';
  }

  rejectRequest(index: number) {
    this.requests[index].status = 'Rejected';
  }
}