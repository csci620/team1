import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  constructor(private http:HttpClient) {}
      getChannels(channelName,find):Observable<any>{
      const API_KEY = "AIzaSyDmRe6vHT2rM5ojvtMNrwaLYeHYlvGy0Bo"
      const url = "https://www.googleapis.com/youtube/v3/search?part=snippet&q="+channelName+"&type=video&key="+API_KEY+"&q="+find+"&maxResults=2"
      return this.http.get<any>(url)
    }
}
