import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public apiUrl = 'https://8080-acadbbfdcebacffbbaaedfbafabcbbce.premiumproject.examly.io';
  private userRole = new BehaviorSubject<string | null>(null);
  private userId = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) { }


  // Registers a new user.
  // Sends a POST request to the '/user/signup' endpoint with the user data.
  // @param user - The user data to register
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/signup`, user);
  }


  // Authenticates a user by logging them in.
  // Sends a POST request to the '/user/login' endpoint with the user's email and password.
  // @param login - The login data containing email and password.
  login(login: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/login`, login);
  }


  // Sets the JWT token, user role, and user ID in localStorage and BehaviorSubjects.
  // @param token - The JWT token.
  // @param role - The user's role.
  setToken(token: string, role: string, id: string): void {
    localStorage.setItem('token', token);
    this.userRole.next(role);
    this.userId.next(id);
  }
}