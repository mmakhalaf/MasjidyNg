import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'mosque-searchbox',
   templateUrl: './mosque-searchbox.component.html',
   styleUrls: ['./mosque-searchbox.component.css']
})
export class MosqueSearchboxComponent implements OnInit {

   unit = 'miles';
   radii = [1, 2, 3, 5, 7, 10, 15, 20, 30];

   constructor() { }

   ngOnInit() {
   }

}
