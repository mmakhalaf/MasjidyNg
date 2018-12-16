import { Injectable } from '@angular/core';
import { } from '@types/googlemaps';

@Injectable({
   providedIn: 'root'
})
export class GeoCodeService {
   
   geocoder = new google.maps.Geocoder();
   coord_regex = /(\-?\d+\.?\d*)\s*\,?\s*(\-?\d+\.?\d*)/;

   constructor() {
      // this.coord_regex.compile();
   }

   get_coordinates(address: string, callback_fn: (coordinates: Coordinates, err: string) => void) {
      address = address.trim();
      let parts = address.match(this.coord_regex);
      if (parts != null && parts.length == 3) {
         let lat = parseFloat(parts[1]);
         let lng = parseFloat(parts[2]);
         callback_fn(new Coordinates(lat, lng), null);
      } else {
         let req: google.maps.GeocoderRequest = {
            address: `${address}`
         };
         this.geocoder.geocode(req, (coordinates, status) => {
            this.on_location_coordinates(coordinates, status, callback_fn);
         });
      }
   }

   on_location_coordinates(
      results: google.maps.GeocoderResult[], 
      status: google.maps.GeocoderStatus,
      callback_fn: (coordinates: Coordinates, err: string) => void
   ) {
      if (status == google.maps.GeocoderStatus.OK && results.length != 0) {
         let location: google.maps.LatLng = results[0].geometry.location;
         callback_fn(new Coordinates(location.lat(), location.lng()), null);
      } else {
         console.error(`Geocoding error. Status: ${status}`);
         callback_fn(null, `Geocoding failure. Status: ${status}`);
      }
   }
}

export class Coordinates {
   constructor(
      public latitude: number,
      public longitude: number
   ) {
   }

   to_string(): string { 
      return `Coordinates: [${this.latitude}, ${this.longitude}]`;
   }
}
