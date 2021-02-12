import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators' 

const baseUrl = 'http://localhost:3000/api/hotels';


@Injectable({
  providedIn: 'root'
})
export class HotelsService {

  constructor(private http: HttpClient) { }

  getHotels(): Observable<any> {
    console.log("getHotels()....");
    return this.http.get(baseUrl);
  }

  get(id): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data): Observable<any> {

    console.log(" in here");
    return this.http.post(baseUrl, data);
    //.pipe(map((response: Response) => response.json());
   
  }

  update(id, data): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByHotelName(name): Observable<any> {
    return this.http.get(`${baseUrl}?name=${name}`);
  }
}


