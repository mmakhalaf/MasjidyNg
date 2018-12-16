import { Injectable, EventEmitter } from '@angular/core';
import { Mosque, MosqueList } from '../models/mosque';

@Injectable({
   providedIn: 'root'
})
export class MosqueMapService {
   public mosqueClicked: EventEmitter<Mosque> = new EventEmitter();
   public mosqueMarkerClicked: EventEmitter<string> = new EventEmitter();
   public mosquesChanged: EventEmitter<MosqueList> = new EventEmitter();
   public mosques = MosqueList.create();

   constructor() {
   }

   mosques_changed(mosques: MosqueList | Array<Mosque> | Mosque[]) {
      this.mosques.from(mosques);
      this.mosquesChanged.emit(this.mosques);
   }

   on_mosque_marker_clicked(marker: google.maps.Marker) {
      let id = marker.get('id');
      if (id !== undefined)
         this.mosqueMarkerClicked.emit(id);
   }

   on_mosque_selected(mosque: Mosque) {
      if (!this.mosques.get_mosque_from_id(mosque.id)) {
         // If we can't find the mosque, this may be through a direct link
         this.mosques_changed([mosque]);
      }
      this.mosqueClicked.emit(mosque);
   }
}
