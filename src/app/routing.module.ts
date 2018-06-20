
import { NgModule} from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from './pagenotfound.component';
import { AcceptInvitationComponent } from './accept-invitation.component';

export const routes: Routes = [
  { path:'',redirectTo:'/home',pathMatch:'full' },

  { path:'home',component:HomeComponent },
  { path:'accept',component:AcceptInvitationComponent },

  { path:'**',component:PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot( routes ) ],
  exports: [ RouterModule ]
})
export class RoutingModule
{
}
