
import { Component,OnInit,AfterViewInit,OnDestroy } from '@angular/core';

import { animate,query,stagger,state,style,transition,trigger } from '@angular/animations';

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

  constructor() {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {}

  openedStart() { this.sidenavstate = 'open'; }
  closedStart() { this.sidenavstate = 'close'; }

  ngOnDestroy(): void {}
}
