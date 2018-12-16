import { Component, OnInit, Input } from '@angular/core';
import { Mosque } from '../models/mosque';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MosquesService } from '../services/mosques.service';
import { switchMap } from 'rxjs/operators';
import { MosqueMapService } from '../mosque-map/mosque-map.service';

@Component({
   selector: 'mosque-details',
   templateUrl: './mosque-details.component.html',
   styleUrls: ['./mosque-details.component.css']
})
export class MosqueDetailsComponent implements OnInit {
   @Input()
   mosque: Mosque;

   constructor(
      private router: Router,
      private route: ActivatedRoute,
      private mosqueService: MosquesService,
      private mapService: MosqueMapService
   ) {

   }

   ngOnInit() {
      // subscribe to the parameters observable
      this.route.paramMap.subscribe(params => {
         let id = params.get('id');
         this.mosque = this.mosqueService.get_mosque(id);
      });

      this.mapService.on_mosque_selected(this.mosque);
      this.mapService.mosqueMarkerClicked.subscribe(this.on_mosque_changed);
   }

   on_mosque_changed = (id: string) => {
      this.mosque = this.mosqueService.get_mosque(id);
   }

   on_clicked_navigate(mosque: Mosque) {
      let dest = encodeURI(`${mosque.name}, ${mosque.address}`);
      let url = `https://www.google.com/maps/dir/?api=1&destination=${dest}&travelmode=driving`;
      window.open(url);
   }
}
