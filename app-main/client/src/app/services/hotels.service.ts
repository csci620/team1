import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';

const baseUrl = `${environment.apiUrl}/api/hotels`;
//const baseUrl = 'http://localhost:3000/api/hotels';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
   "Access-Control-Allow-Headers": '*',
   'Access-Control-Allow-Method':'*',
  })
};

@Injectable({
  providedIn: 'root'
})
export class HotelsService {

  constructor(private http: HttpClient) { }

  getHotels(): Observable<any> {
    console.log("getHotels()... .");
    return this.http.get(baseUrl,  httpOptions);
  }

  get(id): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`, httpOptions);
  }

  create(data): Observable<any> {

    
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


