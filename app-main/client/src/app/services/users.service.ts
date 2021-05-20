import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const baseUrl = 'https://csci620-team1-api.azurewebsites.net/api/users';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
   "Access-Control-Allow-Headers": "*",
   'Access-Control-Allow-Method':'*',
  })
};
@Injectable({
  providedIn: 'root'
})
export class UsersService {

 
  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    console.log("getUsers()... .");
    return this.http.get(baseUrl,  httpOptions);
  }

  get(id): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`, httpOptions);
  }

  create(data): Observable<any> {

     console.log("User service call... to post()")
    return this.http.post(baseUrl, data, httpOptions);
    //.pipe(map((response: Response) => response.json());
   
  }

  update(id, data): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data, httpOptions);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`, httpOptions);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl, httpOptions);
  }

  findByHotelName(name): Observable<any> {
    return this.http.get(`${baseUrl}?name=${name}`, httpOptions);
  }
}
