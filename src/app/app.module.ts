
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { routes,RoutingModule } from './routing.module';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/inputtext';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { AcceptInvitationComponent } from './accept-invitation.component';
import { PageNotFoundComponent } from './pagenotfound.component';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AcceptInvitationComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSidenavModule,
    RoutingModule,

    ButtonModule,
    DialogModule,
    ToolbarModule,
    InputTextModule,

    RouterModule.forRoot( routes )
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
