import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getAuthHeaders } from './base.service';
import {DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AgrochemicalService {
  public apiUrl = 'https://8080-acadbbfdcebacffbbaaedfbafabcbbce.premiumproject.examly.io';

  constructor(private http: HttpClient,private sanitizer:DomSanitizer) {}

  
// Fetches all agrochemicals with pagination, search, and sorting.
// Sends a POST request to the /agroChemical/getAllAgroChemicals endpoint.
// @param page - The page number.
  getAllAgrochemicals(page: number, pageSize: number, searchValue: string, sortOrder: string, sortBy: string): Observable<any> {
    const body = { page, pageSize, searchValue, sortOrder, sortBy };
    return this.http.post<{
      agrochemicals:any[],
      total:number
    }>(`${this.apiUrl}/agroChemical/getAllAgroChemicals`, body);
  }

  
// Retrieves a specific agrochemical by its ID.
// Sends a GET request to the /agroChemical/getAgroChemicalById/:id endpoint.
// @param id - The ID of the agrochemical.
  getAgrochemicalById(id: string): Observable<any> {
    return this.http.get<{agrochemical:any}>(`${this.apiUrl}/agroChemical/getAgroChemicalById/${id}`);
  }

  
// Adds a new agrochemical.
// Sends a POST request to the /agroChemical/addAgroChemical endpoint.
// @param agrochemical - The agrochemical data to add.
  addAgrochemical(agrochemical: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/agroChemical/addAgroChemical`, agrochemical);
  }

  
// Updates an existing agrochemical.
// Sends a PUT request to the /agroChemical/updateAgroChemical/:id endpoint.
// @param id - The ID of the agrochemical
  updateAgrochemical(id: string, agrochemical: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/agroChemical/updateAgroChemical/${id}`, agrochemical);
  }

  
// Deletes an agrochemical with the specified ID.
// Sends a DELETE request to the /agroChemical/deleteAgroChemical/:id endpoint.
// @param id - The ID of the agrochemical
  deleteAgrochemical(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<HttpResponse<any>>(`${this.apiUrl}/agroChemical/deleteAgroChemical/${id}`);
  }

  
// Fetches all agrochemical sellers with pagination, search, and sorting.
// Sends a POST request to the /agroChemical/getAllAgroChemicals endpoint.
// @param page - The page number.
  getAllAgrochemicalSeller(page: number, limit: number, searchValue: string, sortValue: number): Observable<HttpResponse<any>> {
    const body = { page, limit, searchValue, sortValue };
    return this.http.post<HttpResponse<any>>(`${this.apiUrl}/agroChemical/getAllAgroChemicals`, body);
  }

  getFileByImageId(id:string): Observable<SafeUrl>{
    return this.http.get(`${this.apiUrl}/agroChemical/${id}/file`, 
    {
      responseType: 'blob'
    }).pipe(
      map(file => {
        const objectUrl = URL.createObjectURL(file);
        return this.sanitizer.bypassSecurityTrustUrl(objectUrl);
      })
    );
  }
}
