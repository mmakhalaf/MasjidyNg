import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-private-deals',
  templateUrl: './private-deals.component.html',
  styleUrls: ['./private-deals.component.css']
})
export class PrivateDealsComponent implements OnInit, OnDestroy {

  constructor(
   public authService: AuthService
   ) { 

   }
  // When this component is loaded, we'll call the dealService and get our public deals.
  ngOnInit() {
  }
  ngOnDestroy() {
  }
}
