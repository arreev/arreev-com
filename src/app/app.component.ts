
import { animate,query,stagger,state,style,transition,trigger } from '@angular/animations';
import { Component,OnInit,AfterViewInit,OnDestroy,Input } from '@angular/core';
import { environment } from '../environments/environment';

import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    /*
     * https://angular.io/guide/animations
     * https://angular.io/api/animations/state
     */
    trigger('sidenav-animation',[
      state('open', style({ transform:'rotate(90deg)' } ) ),
      state('close',style({ transform:'rotate( 0deg)' } ) ),
      transition('* => *',animate('200ms' ) )
    ])
  ]
})
export class AppComponent implements OnInit,AfterViewInit,OnDestroy
{
  sidenavstate = '';

  constructor() {
    console.log( 'AppComponent' );

    firebase.initializeApp( environment.firebase );
    console.log( 'localStorage.removeItem...' );
    localStorage.removeItem('firebase:previous_websocket_failure' ); // as per bug report
    console.log( 'localStorage.removeItem ok' );
  }

  ngOnInit(): void {}
  ngAfterViewInit(): void {}

  openedStart() { this.sidenavstate = 'open'; }
  closedStart() { this.sidenavstate = 'close'; }

  ngOnDestroy(): void {}
}
