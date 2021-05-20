import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';
import {HotelsService} from '../../services/hotels.service'

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ViewChild, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {MapsAPILoader} from '@agm/core';
import {GoogleMapsAPIWrapper} from '@agm/core';
import { AuthService } from '@auth0/auth0-angular';

const apiKey = "f445c5c0ab5fe17b3a86807d237f710c"
const apiUrl = "https://api.openweathermap.org/data/2.5"


@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css'],
  providers: [HotelsService]
})



export class HotelsComponent implements OnInit {


  userForm: FormGroup;
  
   message: String;
  
   latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  name: string;
  result_places: any = <any>[];
  filtered_places: any = <any>[];
  current_photos: any = <any>[];
  places_index: any = <any>[];
  currentWeather: any = <any>{};
  loading = true;
  max = [0,1,2,3,4,5];

 

  private geoCoder;
   hotel= {
    
    hotelName: '',
    hotelAddr: '',
    hotelPricePerDay: '',
    hotelPriceCurr: '',
    hotelPhone: 0,
    hotelEmail: '',
    isBooked: false
   };
   hotels: any = <any>[];

  constructor(private hotelService: HotelsService, private http: HttpClient,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, public auth: AuthService, private fb : FormBuilder) {
    
   }

  ngOnInit(): void {
    this.message = "";
   
    
      this.mapsAPILoader.load().then(() => {
    
        this.setCurrentLocation();
        this.geoCoder = new google.maps.Geocoder;
      });
    
   

   
  }

  addHotels(): void {
   
    console.log(" data hotelname=> " +  this.hotel.hotelName);
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

       /* if (response.message !== undefined ) {
          this.message = "Select destination on Dashboard!!";
          window.alert('Geocoder failed due to: ' + this.message);
          return;
        } */
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
          console.log(JSON.stringify(data));
          console.log(" message UI => " + data.message)
          if (data.message !== undefined && data.message == "No data") {
            this.message = "No Data";
            console.log("No hotels selected by user");
            this.mapsAPILoader.load().then(() => {
    
              this.setCurrentLocation();
              this.geoCoder = new google.maps.Geocoder;
            });
            return;
          }

          this.message = "booked";
          data.hotelPriceCurr = "USD";
          data.hotelPricePerDay=Math.floor((Math.random() * 100) + 1);
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














  
  wait = true;

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
     
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }


  
  getAddress(latitude, longitude) {
    console.log("again")
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      
      if (status === 'OK') {
        if (results[0]) {
          let service =  new google.maps.places.PlacesService(document.createElement('div')); 
          var location = results[0].geometry.location;

          var req_places = { location: location, radius: 5000000, types: ['lodging'] };

          service.nearbySearch(req_places,  (results, status) => {

            if (status == google.maps.places.PlacesServiceStatus.OK) {
              if (results[0]) {
                console.log("testing => " + results)
               this.result_places = results;
               
                this.check(this.result_places)

              // check the type to determine the marker, or pass a url to the marker icon
              }
            }
          });
          //     alert(results[0].formatted_address);
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    
    });
    console.log("hi")
  }

  async check(results: any = <any>[]){
    console.log(this.result_places)
    let service =  new google.maps.places.PlacesService(document.createElement('div')); 
    for(var i = 0; i <  this.result_places.length; i++) {
      var obj =  this.result_places[i];
      // this.name = obj.name
      console.log(obj.name)
      console.log("i1-"+i)
      //console.log(obj.geometry.location.lat())
      let httpData = await this.getCurrentWeather(obj.geometry.location.lat(),obj.geometry.location.lng())
      console.log("data")
      console.log(httpData)
      this.currentWeather = httpData;
      if(this.currentWeather.weather[0].main=="Clear"){
        console.log("i2-"+i)
        await this.show(obj.place_id,service)
        .then( results => {
          // geocoder returns a "then-able" promise with results
          // .then only runs after the promise resolves
          var result_data = JSON.parse(JSON.stringify(results))
          // console.log(result_data.photos[0].getUrl({maxWidth: 500, maxHeight: 500}))
          // console.log("photo-"+ result_data.photos[0].getUrl({maxWidth: 500, maxHeight: 500}))
          let ratingHtml = "";

          for (let i = 0; i < 5; i++) {
            if (result_data.rating < i + 0.5) {
              ratingHtml += "&#u2605;";
            } else {
              ratingHtml += "&#10029;";
            }
          }
          obj.photos = result_data.photos;
          obj.telephone = result_data.telephone;
          obj.address = result_data.address;
          obj.max = this.max;
        
          obj.reviews = JSON.parse(JSON.stringify(result_data.reviews[0]));
          
          console.log("review-"+obj.reviews.author_name)
          this.filtered_places.push(obj)
        })
        .catch(function(status){
          console.log(status)
        })
        //console.log(obj.id);
      }
      console.log("dfd")
      this.loading = false;
    }
  }
  getCurrentWeather(lat: number, lng: number){
    console.log(lat)
    return this.http.get(`${apiUrl}/weather?lat=${lat}&lon=${lng}&appid=${apiKey}`).toPromise()
  }


    async show(place_id: string,service: google.maps.places.PlacesService){
      //let service =  new google.maps.places.PlacesService(document.createElement('div')); 
      var temp_photos = <any>[]
      return new Promise(function(resolve,reject){
      service.getDetails({placeId: place_id},(place,status)=> {
        if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            place &&
            place.geometry &&
            place.geometry.location
        ) {
        console.log(place)

        
        //var team_photos = <any>[]
        //place.photos.forEach(photo=> {
        //temp_photos.push(photo.getUrl({maxHeight: 200, maxWidth: 200}))
        //   })
        if (place.photos) {
          for (let j = 0; j < place.photos.length;  j++) {
            if (j < 3)
              temp_photos.push(place.photos[j].getUrl({maxHeight: 1000, maxWidth: 1000}))
          }
        }
       
        // this.current_photos = place.photos
        //  console.log("photo-"+place.photos[0].getUrl({maxWidth: 500, maxHeight: 500}))
        
        resolve({"reviews":place.reviews,"photos":temp_photos, "telephone": place.formatted_phone_number, "address": place.vicinity, "rating": place.rating})
        //console.log("results2-"+place.name)
      }
      else{
       //this.loading = false;
      reject(status)
      }
    })
  })  
}


}
