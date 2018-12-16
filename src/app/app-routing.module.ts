import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicDealsComponent } from './public-deals/public-deals.component';
import { PrivateDealsComponent } from './private-deals/private-deals.component';
import { CallbackComponent } from './callback/callback.component';
import { AuthGuard } from './auth/auth.guard';
import { MosquesSearchComponent } from './mosques-search/mosques-search.component';
import { NavService } from './nav/nav.service';
import { MosqueDetailsComponent } from './mosque-details/mosque-details.component';

const routes: Routes = [
   {
      path: '',
      redirectTo: NavService.mosques_search,
      pathMatch: 'full'
   },
   {
      path: NavService.mosques_search,
      component: MosquesSearchComponent
   },
   {
      path: `${NavService.mosque_details}/:id`,
      component: MosqueDetailsComponent
   },
   {
      path: 'deals',
      component: PublicDealsComponent
   },
   {
      path: 'special',
      component: PrivateDealsComponent,
      canActivate: [
         AuthGuard
      ]
   },
   {
      path: 'callback',
      component: CallbackComponent
   }
];


@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule],
   providers: [
      AuthGuard
   ]
})
export class AppRoutingModule { }
