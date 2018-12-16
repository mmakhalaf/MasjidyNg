import { Injectable } from '@angular/core';
import { Mosque, MosqueCoord, MosqueList } from '../models/mosque';

@Injectable({
   providedIn: 'root'
})
export class MosquesService {

   mosques = MosqueList.create();

   lng: number = undefined;
   lat: number = undefined;
   radius: number = undefined;
   
   constructor() {
      this.mosques.push(new Mosque(0, 'Amanah Mosque', new MosqueCoord(52.467165, -1.876544), '29 Henley St, Birmingham, B11 1JB, United Kingdom'));
      this.mosques.push(new Mosque(1, 'Muslim Student House', new MosqueCoord(52.457465, -1.885837), '517 Moseley Rd, Birmingham, B12 9BX, United Kingdom'));
      this.mosques.push(new Mosque(2, 'Birmingham Central Mosque', new MosqueCoord(52.464632, -1.890741), '180 Belgrave Middleway, Birmingham, B12 0XS, United Kingdom'));
   }

   search(lng: number, lat: number, radius: number): MosqueList {
      // We return the cached version if the search provides the same parameters
      this.lat = lat;
      this.lng = lng;
      this.radius = radius;
      return this.mosques;
   }

   get_all_mosques(): MosqueList {
      return this.mosques;
   }

   get_mosque(id: number | string): Mosque {
      return this.mosques.get_mosque_from_id(id);
   }
}
