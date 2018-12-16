import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MosquesService } from '../services/mosques.service';
import { Mosque, MosqueList } from '../models/mosque';

import { } from '@types/googlemaps';
import { NavService } from '../nav/nav.service';
import { MosqueMapService } from '../mosque-map/mosque-map.service';
import { PrayerTimesService } from '../services/prayer-times.service';

@Component({
   selector: 'mosques-search',
   templateUrl: './mosques-search.component.html',
   styleUrls: ['./mosques-search.component.css']
})
export class MosquesSearchComponent implements OnInit {

   mosques = MosqueList.create();
   current_mosque: Mosque = null;

   lat: number = 51.678418;
   lng: number = 7.809007;

   constructor(
      private mosquesService: MosquesService,
      private changeDetection: ChangeDetectorRef,
      private navService: NavService,
      private mapService: MosqueMapService,
      private prayerService: PrayerTimesService
   ) {

   }

   ngOnInit() {
      this.mosques = this.mosquesService.get_all_mosques();
      this.mapService.mosques_changed(this.mosques);
      this.mapService.mosqueMarkerClicked.subscribe(this.on_mosque_marker_clicked);
   }

   on_mosque_clicked(mosque: Mosque) {
      console.log(`Mosque "${mosque.name}" clicked.`);
      this.current_mosque = mosque;
   }

   on_mosque_marker_clicked = (id: string) => {
      this.on_clicked_details(this.mosques.get_mosque_from_id(id));
   }
   
   is_mosque_clicked(mosque: Mosque) {
      return this.current_mosque != null && this.current_mosque.id == mosque.id;
   }

   on_clicked_details(mosque: Mosque) {
      this.current_mosque = mosque;
      this.navService.to_mosque_details(mosque.id);
   }

   get_next_prayer_name_string(mosque: Mosque): string {
      let ptime = this.prayerService.get_next_prayer_mosque(mosque);
      if (ptime)
         return ptime.name;
      else
         return '';
   }

   get_next_prayer_time_string(mosque: Mosque): string {
      let ptime = this.prayerService.get_next_prayer_mosque(mosque);
      if (ptime) {
         let h = ptime.date;
         let pm_am = h.getUTCHours() > 12 ? 'pm' : 'am';
         return `${h.getUTCHours()}:${h.getMinutes()} ${pm_am}`;
      } else {
         return '';
      }
   }

}
