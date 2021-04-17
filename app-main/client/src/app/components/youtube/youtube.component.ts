import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {YoutubeService} from '../../services/youtube.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent implements OnInit {
  videos:any
  @ViewChild('find') find: ElementRef;

  constructor(private youtube:YoutubeService) { }

  ngOnInit(): void {
    this.youtube.getChannels("travel guide","laketahoe").subscribe((data)=>{
      console.log(data)
      this.videos = data.items
    })
  }
  getData(){
      var find = this.find.nativeElement.value
      this.youtube.getChannels("travel guide",find).subscribe((data)=>{
      console.log(data)
      this.videos = data.items
    })
  }
}
