
import { Component,OnInit,AfterViewInit,OnDestroy } from '@angular/core';

import { animate,query,stagger,style,transition,trigger } from '@angular/animations';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  animations: [
    trigger('logo-fade-in',[
      transition(':enter',[
        style({ opacity:0 } ),
        animate('1000ms ease-in',style({ opacity:1 } ) )
      ] )
    ] ),
    trigger('arreev-fade-in-stagger',[
      transition('* => *',[
        query(':enter',[
          style({ opacity:0 } ),
          stagger(100,[ animate('250ms',style({ opacity:1 } ) ) ] )
        ] )
      ] )
    ] ),
    trigger('arreev-slide-in-stagger',[
      transition('* => *',[
        query(':enter',[
          style({ opacity:0,transform:'translateX(1000%)' } ),
          stagger(100,[ animate('250ms',style({ opacity:1,transform:'translateX(0)' } ) ) ] )
        ] )
      ] )
    ] ),
    trigger('image-fade-in',[
      transition( ':enter',[
        style({ opacity:0 } ),
        animate('2500ms ease-in',style({ opacity:1 } ) )
      ] )
    ] ),
  ]
})
export class ContentComponent implements OnInit,AfterViewInit,OnDestroy
{
  letters: string[] = [ 'a','r','r','e','e','v' ];
  showdemoconsolemessage = false;
  showdemoapplicationmessage = false;

  constructor() {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {}
  onCreateAccount() { this.showdemoconsolemessage = true; }
  onGoPlanner() { this.showdemoconsolemessage = true; }
  onGooglePlay() { this.showdemoapplicationmessage = true; }
  onAppStore() {}
  onToMyArreev() { window.location.href = 'https://my.arreev.com'; }
  onToPlay() { window.location.href = 'https://play.google.com/store/apps/details?id=com.arreev.android' ;}
  ngOnDestroy(): void {}
}
