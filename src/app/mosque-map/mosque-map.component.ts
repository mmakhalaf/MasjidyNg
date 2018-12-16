import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Mosque, MosqueList } from '../models/mosque';
import { MosqueMapService } from './mosque-map.service';

@Component({
   selector: 'mosque-map',
   templateUrl: './mosque-map.component.html',
   styleUrls: ['./mosque-map.component.css']
})
export class MosqueMapComponent implements OnInit {

   @ViewChild('gmap')
   gmapElement: any;
   map: google.maps.Map;
   map_markers = new Array<google.maps.Marker>();


   mosques = MosqueList.create();
   current_mosque: Mosque = null;


   constructor(private mapService: MosqueMapService) {
   }

   ngOnInit() {
      let mapProp: google.maps.MapOptions = {
         center: new google.maps.LatLng(18.5793, 73.8143),
         zoom: 15,
         mapTypeId: google.maps.MapTypeId.ROADMAP,
         mapTypeControlOptions: {
            position: google.maps.ControlPosition.RIGHT_TOP
         }
      };
      this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

      this.on_mosques_changed(this.mapService.mosques);

      this.mapService.mosqueClicked.subscribe(this.on_mosque_clicked);
      this.mapService.mosquesChanged.subscribe(this.on_mosques_changed);
   }

   on_mosques_changed = (mosques: MosqueList) => {
      for (let m of this.map_markers) {
         m.setMap(undefined);
      }
      this.mosques = mosques.clone();
      this.map_markers = new Array();
      let pos_bounds = new google.maps.LatLngBounds();
      for (let mosque of this.mosques) {
         let pos = new google.maps.LatLng(mosque.coords.x_coord, mosque.coords.y_coord);
         let marker_options: google.maps.MarkerOptions = {
            position: pos,
            clickable: true,
            map: this.map
         };
         let marker = new google.maps.Marker(marker_options);
         marker.set('id', mosque.id);
         marker.addListener('click', () => { this.mapService.on_mosque_marker_clicked(marker); });
         pos_bounds.extend(pos);
         this.map_markers.push(marker);
      }
      this.map.fitBounds(pos_bounds);
   }

   on_mosque_clicked = (mosque: Mosque) => {
      this.current_mosque = mosque;
      for (let m of this.map_markers) {
         let id = m.get('id');
         if (id !== undefined && id == mosque.id) {
            this.map.panTo(m.getPosition());
         }
      }
   }
}
