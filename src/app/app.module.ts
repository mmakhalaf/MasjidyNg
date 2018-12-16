import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import * as mat  from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { PublicDealsComponent } from './public-deals/public-deals.component';
import { PrivateDealsComponent } from './private-deals/private-deals.component';
import { CallbackComponent } from './callback/callback.component';
import { Router, RouterModule } from '@angular/router';
import { MosquesSearchComponent } from './mosques-search/mosques-search.component';
import { MosqueDetailsComponent } from './mosque-details/mosque-details.component';
import { MosqueMapComponent } from './mosque-map/mosque-map.component';
import { MosqueSearchboxComponent } from './mosque-searchbox/mosque-searchbox.component';

@NgModule({
   declarations: [
      AppComponent,
      MosquesSearchComponent,
      PublicDealsComponent,
      PrivateDealsComponent,
      CallbackComponent,
      MosqueDetailsComponent,
      MosqueMapComponent,
      MosqueSearchboxComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      AppRoutingModule,
      RouterModule,
      HttpClientModule,
      mat.MatExpansionModule,
      mat.MatButtonModule,
      mat.MatCheckboxModule,
      mat.MatInputModule,
      mat.MatFormFieldModule,
      mat.MatInputModule,
      mat.MatIconModule,
      mat.MatSidenavModule,
      mat.MatListModule,
      mat.MatGridListModule,
      mat.MatToolbarModule,
      mat.MatTooltipModule,
      mat.MatDividerModule,
      mat.MatOptionModule,
      mat.MatSelectModule,
      mat.MatCardModule
   ],
   exports: [
   ],
   providers: [
      AuthService,
      RouterModule
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
