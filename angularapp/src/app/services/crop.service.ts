import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CropService {
  private baseUrl = 'https://8080-acadbbfdcebacffbbaaedfbafabcbbce.project.examly.io/crop';

  constructor(private http: HttpClient) { }

  /**
 * Retrieves crop details using the given crop ID.
 * Helps fetch specific crop data for viewing or processing.
 * Returns an observable containing the crop details.
 */
  getCropById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getCropById/${id}`);
  }

  /**
   * Adds a new crop to the system.
   * Sends crop details to the backend for storage.
   * Returns an observable indicating success or failure.
   */
  addCrop(crop: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addCrop`, crop);
  }

  /**
   * Updates an existing crop record.
   * Modifies crop details based on the provided ID.
   * Returns an observable confirming the update.
   */
  updateCrop(id: string, crop: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateCrop/${id}`, crop);
  }

  /**
   * Retrieves a filtered and paginated list of crops.
   * Allows sorting, searching, and pagination.
   * Returns an observable containing the crop list.
   */
  getAllCrops(page: number, pageSize: number, searchValue: string, sortOrder: string, sortBy: string): Observable<any> {
    const body = { page, pageSize, searchValue, sortOrder, sortBy };
    return this.http.post(`${this.baseUrl}/getAllCrops`, body);
  }

  /**
   * Deletes a crop by its unique ID.
   * Removes the crop from the database permanently.
   * Returns an observable indicating the result.
   */
  deleteCrop(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteCrop/${id}`);
  }

  /**
   * Fetches all crops belonging to a specific user.
   * Helps filter crops based on ownership.
   * Returns an observable containing the user's crops.
   */
  getCropsByUserId(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/getCropByUserId/${userId}`);
  }
}