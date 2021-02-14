import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';
import {HotelsService} from '../../services/hotels.service'

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css'],
  providers: [HotelsService]
})
export class HotelsComponent implements OnInit {
   hotels:  Array<any>;
   hotel= {
    
    hotelName: '',
    hotelAddr: '',
    hotelPricePerDay: '',
    hotelPriceCurr: '',
    hotelPhone: 0,
    hotelEmail: '',
    isBooked: false
   };
  

  constructor(private hotelService: HotelsService) { }

  ngOnInit(): void {
    this.getHotels();
  }

  addHotels(): void {
    
    const newHotel = {
      hotelName: this.hotel.hotelName,
      hotelAddr: this.hotel.hotelAddr,
      hotelPricePerDay: this.hotel.hotelPricePerDay,
      hotelPriceCurr: this.hotel.hotelPriceCurr,
      hotelPhone: this.hotel.hotelPhone,
      hotelEmail: this.hotel.hotelEmail,
      isBooked: this.hotel.isBooked

    }

    this.hotelService.create(newHotel).subscribe(
      response => {
        console.log(response);
       // this.isBooked = true;
        console.log("hotel :  saved in database " );
        this.hotels.push(response);
        
        this.hotelService.getHotels()
        .subscribe(
          data => {
          
            this.hotels =    data;
           
            
          },
          error => {
            console.log(error);
          });
      },
      error => {
        console.log(error);
      });
  }

   getHotels(): void {
    this.hotelService.getHotels()
      .subscribe(
        data => {
        
          this.hotels =    data;
         
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }


  deleteAll(): void {
    this.hotelService.deleteAll()
    .subscribe(
      hotel => {
      
        console.log(hotel);
        this.getHotels();
      },
      error => {
        console.log(error);
      });
  }

  deleteHotel(ind): void {
    this.hotelService.delete(ind)
      .subscribe(
        response => {
          console.log(response);
          this.getHotels();
          /*for (let val = this.hotels.length; val >=0; val--) {
            if (this.isChecked[val]) {
              this.hotels.splice(val, 1);
              delete this.isChecked[val];
            }
          } */
        },
        error => {
          console.log(error);
        });
  }


  updateHotel(ind, data): void {
    this.hotelService.update(ind, data)
      .subscribe(
        response => {
          console.log(response);
          //this.message = 'The book was updated successfully!';
          this.getHotels();
        },
        error => {
          console.log(error);
        });
  }

}
