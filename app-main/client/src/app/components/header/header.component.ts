import { Component, Host, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
  }
  variable = false;
  header_variable = false;
  home = true;
  @HostListener("document:scroll")
  scrollfunction(){
    if(document.body.scrollTop > 0 || document.documentElement.scrollTop > 0){
      this.header_variable = true;
      this.variable = true;
      this.home = false
    }
    else{
      this.header_variable = false;
      this.variable = false;
      this.home = true
    }

  } 
}
