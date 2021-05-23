import { Component, OnInit } from '@angular/core';
import { ViewChild, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {MapsAPILoader} from '@agm/core';
import { AuthService } from '@auth0/auth0-angular';
import {GoogleMapsAPIWrapper} from '@agm/core';
import datepicker from 'js-datepicker'

const apiKey = "f445c5c0ab5fe17b3a86807d237f710c"
const apiUrl = "https://api.openweathermap.org/data/2.5"

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit {
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

  users:  Array<any>;

  private geoCoder;


  
  constructor(
    private http: HttpClient,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,private router: Router,public auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
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
          console.log(result_data.photos)
          obj.photos = result_data.photos;
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

  loginWithRedirect(): void {
    this.auth.loginWithRedirect();
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
        temp_photos.push(place.photos[0].getUrl({maxHeight: 500, maxWidth: 500}))
        // this.current_photos = place.photos
        //  console.log("photo-"+place.photos[0].getUrl({maxWidth: 500, maxHeight: 500}))
        resolve({"reviews":place.reviews,"photos":temp_photos})
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
