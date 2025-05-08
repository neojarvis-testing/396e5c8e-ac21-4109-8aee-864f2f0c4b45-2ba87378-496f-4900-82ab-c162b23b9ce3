import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgrochemicalService {

  private baseUrl = 'https://your-api-url.com/agroChemical';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Fetch all agrochemicals with pagination and search functionality
  // Send a POST request to the server with pagination and search parameters
  // Return the observable containing the response data.
  getAllAgrochemicals(page: number, pageSize: number, searchValue: string, sortOrder: string, sortBy: string): Observable<any> {
    const url = `${this.baseUrl}/getAllAgroChemicals`;
    const body = { page, pageSize, searchValue, sortOrder, sortBy };
    return this.http.post(url, body, { headers: this.getHeaders() });
  }

  // Fetch a single agrochemical by its ID
  // Send a GET request to retrieve the agrochemical details by ID
  // Return the observable containing the agrochemical data.
  getAgrochemicalById(id: string): Observable<any> {
    const url = `${this.baseUrl}/getAgroChemicalById/${id}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  // Add a new agrochemical to the database
  // Send a POST request to add a new agrochemical with the provided data
  // Return the observable containing the response data.
  addAgrochemical(agrochemical: any): Observable<any> {
    const url = `${this.baseUrl}/addAgroChemical`;
    return this.http.post(url, agrochemical, { headers: this.getHeaders() });
  }

  // Update an existing agrochemical by its ID
  // Send a PUT request to update the agrochemical details with the provided data
  // Return the observable containing the response data.
  updateAgrochemical(id: string, agrochemical: any): Observable<any> {
    const url = `${this.baseUrl}/updateAgroChemical/${id}`;
    return this.http.put(url, agrochemical, { headers: this.getHeaders() });
  }

  // Delete an agrochemical by its ID
  // Send a DELETE request to remove the agrochemical from the database
  // Return the observable containing the response data.
  deleteAgrochemical(id: string): Observable<HttpResponse<any>> {
    const url = `${this.baseUrl}/deleteAgroChemical/${id}`;
    return this.http.delete<HttpResponse<any>>(url, { headers: this.getHeaders() });
  }

  // Fetch all agrochemicals for a seller with pagination and search functionality
  // Send a POST request to retrieve agrochemicals for a seller with pagination and search parameters
  // Return the observable containing the response data.
  getAllAgrochemicalSeller(page: number, limit: number, searchValue: string, sortValue: number): Observable<HttpResponse<any>> {
    const url = `${this.baseUrl}/getAllAgroChemicals`;
    const body = { page, limit, searchValue, sortValue };
    return this.http.post<HttpResponse<any>>(url, body, { headers: this.getHeaders() });
  }
}
