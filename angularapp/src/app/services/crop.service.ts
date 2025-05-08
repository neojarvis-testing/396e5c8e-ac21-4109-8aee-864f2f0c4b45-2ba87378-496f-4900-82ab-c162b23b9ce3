// app/services/crop.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getAuthHeaders } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CropService {
  public apiUrl = 'http://your-workspace-url:8080';

  constructor(private http: HttpClient) { }


  // Retrieves a specific crop by its ID.
  // Sends a GET request to the /crop/getCropById/:id endpoint.
  // @param id - The ID of the crop
  getCropById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/crop/getCropById/${id}`, { headers: getAuthHeaders() });
  }


  // Adds a new crop.
  // Sends a POST request to the /crop/addCrop endpoint.
  // @param crop - The crop data to add.
  addCrop(crop: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/crop/addCrop`, crop, { headers: getAuthHeaders() });
  }


  // Updates an existing crop.
  // Sends a PUT request to the /crop/updateCrop/:id endpoint.
  // @param id - The ID of the crop
  updateCrop(id: string, crop: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/crop/updateCrop/${id}`, crop, { headers: getAuthHeaders() });
  }

  // Fetches all crops with pagination, search, and sorting.
  // Sends a POST request to the /crop/getAllCrops endpoint.
  // @param page - The page number
  getAllCrops(page: number, pageSize: number, searchValue: string, sortOrder: string, sortBy: string): Observable<any> {
    const body = { page, pageSize, searchValue, sortOrder, sortBy };
    return this.http.post(`${this.apiUrl}/crop/getAllCrops`, body, { headers: getAuthHeaders() });
  }


  // Deletes a crop with the specified ID.
  // Sends a DELETE request to the /crop/deleteCrop/:id endpoint.
  // @param id - The ID of the crop
  deleteCrop(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/crop/deleteCrop/${id}`, { headers: getAuthHeaders() });
  }


  // Retrieves all crops associated with a specific user ID.
  // Sends a GET request to the /crop/getCropsByUserId/:userId endpoint.
  // @param userId - The user ID
  getCropsByUserId(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/crop/getCropsByUserId/${userId}`, { headers: getAuthHeaders() });
  }
}
