
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatSidenavModule } from '@angular/material';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

import { AppComponent } from './app.component';
import { ContentComponent } from './content.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,

    MatSidenavModule,

    ButtonModule,
    DialogModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
