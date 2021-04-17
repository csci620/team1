import { Component, OnInit } from '@angular/core';
import { ViewChild, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MapsAPILoader } from '@agm/core';
import datepicker from 'js-datepicker'

const apiKey = "f445c5c0ab5fe17b3a86807d237f710c"
const apiUrl = "https://api.openweathermap.org/data/2.5"

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  name: string;
  result_places: any = <any>[];
  filtered_places: any = <any>[];
  currentWeather: any = <any>{};

  private geoCoder;


  
  constructor(
    private http: HttpClient,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
    });
  }


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
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      
      if (status === 'OK') {
        if (results[0]) {
          let service =  new google.maps.places.PlacesService(document.createElement('div')); 
          var location = results[0].geometry.location;

          var req_places = { location: location, radius: 5000000, types: ['tourist_attraction'] };

          service.nearbySearch(req_places,  (results, status) => {

            if (status == google.maps.places.PlacesServiceStatus.OK) {
              if (results[0]) {
                console.log(results)
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
  //    console.log(obj.geometry.location.lat())
  
let httpData = await this.getCurrentWeather(obj.geometry.location.lat(),obj.geometry.location.lng())
 /*.subscribe(res => {
    this.currentWeather = res;
    console.log(this.currentWeather)
    if(this.currentWeather.weather[0].main=="Clear"){
      console.log("i2-"+i)
    this.filtered_places.push(this.currentWeather.name)
    }
  }, err => {
    if (err.error && err.error.message) {
      alert(err.error.message);
      //this.msg = err.error.message;
      return;
    }
    alert('Failed to get weather.');
  }, () => {
})*/
console.log("data")
console.log(httpData)
this.currentWeather = httpData;
if(this.currentWeather.weather[0].main=="Clear"){

    var req_photos = {placeId:obj.place_id};

    await service.getDetails(req_photos,(place,status)=> {
      if (
        status === google.maps.places.PlacesServiceStatus.OK &&
        place &&
        place.geometry &&
        place.geometry.location
      ) {
     var parsed = JSON.parse(JSON.stringify(place))
     console.log(JSON.stringify(place))
     console.log("length1-"+place.photos.length)
     obj.reviews = place.reviews
     console.log("length2-"+obj.photos.length)
     console.log("obj-"+JSON.stringify(obj))
  
     var temp_photos = <any>[]
     place.photos.forEach(photo => {
      temp_photos.push(photo.getUrl({ maxWidth: 500, maxHeight: 500 }));
    });
    obj.photos = temp_photos
     this.filtered_places.push(obj)
   //  console.log("results2-"+place.name)
      }
      else{
        console.log("status2-"+status)
      }
                     })
                 
                   


     // console.log(obj.id);
  }
  }
}
  getCurrentWeather(lat: number, lng: number) {
    console.log(lat)
    return this.http.get(`${apiUrl}/weather?lat=${lat}&lon=${lng}&appid=${apiKey}`).toPromise()
  }


  show(place_id: string){
    console.log("place_id-"+place_id)
  }




   
}
