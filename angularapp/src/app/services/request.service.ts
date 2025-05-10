// app/services/request.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getAuthHeaders } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  public apiUrl = 'https://8080-bcebabfceebacffbbaaedfbafabcbbce.premiumproject.examly.io';
  constructor(private http: HttpClient) { }

  // Retrieves all requests associated with a specific user ID.
  // Sends a GET request to the /request/getRequestsByUserId/:userId endpoint.
  // @param userId - The user ID
  getRequestsByUserId(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/request/getRequestByUserId/${userId}`);
  }

  // Adds a new request.
  // Sends a POST request to the /request/addRequest endpoint.
  // @param request - The request data to add.

  addRequest(request: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/request/addRequest`, request);
  }


  // Updates an existing request.
  // Sends a PUT request to the /request/updateRequest/:requestId endpoint.
  // @param requestId - The ID of the request.
  updateRequest(requestId: string, request: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/request/updateRequest/${requestId}`, request);
  }


  // Deletes a request with the specified ID.
  // Sends a DELETE request to the /request/deleteRequest/:requestId endpoint.
  // @param requestId - The ID of the request
  deleteRequest(requestId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/request/deleteRequest/${requestId}`);
  }


  // Fetches all requests.
  // Sends a GET request to the /request/getAllRequests endpoint.
  getAllRequests(): Observable<any> {
    return this.http.get(`${this.apiUrl}/request/getAllRequests`, { headers: getAuthHeaders() });
  }
}