import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  jsonUrl: string = 'http://localhost:3000/user';
  userList: User[] = [];

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.jsonUrl);
  }


  getOne(id: number): Observable<User> {
    return this.http.get<User>(`${this.jsonUrl}/${id}`)
  }
  create(user: User): Observable<User> {
    return this.http.post<User>(this.jsonUrl, user)
  }
  update(user: User): Observable<User> {
    return this.http.put<User>(`${this.jsonUrl}/${user.id}`, user)
  }
  remove(id: number): Observable<User> {
    return this.http.delete<User>(`${this.jsonUrl}/${id}`)
  }
}