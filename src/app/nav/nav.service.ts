import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
   providedIn: 'root'
})
export class NavService {
   static mosques_search = 'search';
   static mosque_details = 'details';

   constructor(
      private router: Router
   ) {

   }

   to_mosque_search() {
      this.router.navigateByUrl(NavService.mosques_search);
   }

   to_mosque_details(mosque_id: number) {
      // this.router.navigateByUrl(`${NavService.mosque_details}/${mosque_id}`);
      this.router.navigate([NavService.mosque_details, mosque_id]);
   }
}
