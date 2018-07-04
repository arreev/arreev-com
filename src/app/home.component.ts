
import { animate,query,stagger,style,transition,trigger } from '@angular/animations';
import { Component,OnInit,AfterViewInit,OnDestroy } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import * as firebase from 'firebase';
import { isBlank } from './util';

@Component({
  selector: 'app-content',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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
export class HomeComponent implements OnInit,AfterViewInit,OnDestroy
{
  letters: string[] = [ 'a','r','r','e','e','v' ];
  showcreateaccountdialog = false;
  showcomingsoondialog = false;
  startplanning = false;

  email = '';
  password = '';
  confirmpassword = '';
  firstname = '';
  lastname = '';

  accounterrormessage = '';
  accountinfovalidated = false;
  working = false;
  accountcreated = false;

  constructor( private route:ActivatedRoute ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(m => {
      const action:string = m.get( 'action' );
      if ( 'create' === action ) {
        this.showcreateaccountdialog = true;
        this.email = m.get( 'email' );
      }
    } );
  }

  ngAfterViewInit(): void {
    setTimeout( () => this.validation(),100 );
  }

  onCreateAccount() {
    this.startplanning = false;
    this.showcreateaccountdialog = true;
  }

  onGoPlanner() { window.location.href = 'https://my.arreev.com'; }

  onStartPlanning() {
    this.startplanning = true;
    this.showcreateaccountdialog = true;
  }

  onAppStore() {
    this.showcomingsoondialog = true;
  }

  validation() {
    this.accountinfovalidated =
      !isBlank( this.email ) &&
      !isBlank( this.password ) &&
      !isBlank( this.confirmpassword ) &&
      !isBlank( this.firstname ) &&
      !isBlank( this.lastname );
  }

  onCreateAccountOK() {
    this.createAccount();
  }

  private createAccount() {
    this.working = false;
    this.accounterrormessage = '';

    if ( this.password !== this.confirmpassword ) {
      this.accounterrormessage = 'password and confirm-password do not match';
      return;
    }

    this.working = true;

    console.log( 'createUserWithEmailAndPassword...' );
    firebase.auth().createUserWithEmailAndPassword( this.email,this.password )
      .then(u => {
        console.log( 'sendEmailVerification...' );
        u.sendEmailVerification()
          .then(() => {
            console.log( 'updateProfile...' );
            u.updateProfile({ displayName:(this.firstname + ' ' + this.lastname) } )
              .then( p => {
                this.working = false;
                this.accountcreated = true;
                this.createUserInRealtimeDatabase( u,this.firstname,this.lastname ); // necessary because cloud functions is lacking
                console.log( 'user creation success' );
              } );
          } );
      } )
      .catch(r => {
        this.working = false;
        this.accounterrormessage = r.message;
      } );
  }

  private createUserInRealtimeDatabase( user:firebase.User, firstname:string,lastname:string ) {
    firebase.database().ref('users' )
      .child( user.uid )
      .set( {
        email: user.email,
        firstname: firstname,
        lastname: lastname
      } )
      .then( () => console.log( 'users entry set' ) )
      .catch( r => console.log( r ) );
  }

  private createAccountPending() {
    this.working = false;
    this.accounterrormessage = '';

    if ( this.password !== this.confirmpassword ) {
      this.accounterrormessage = 'password and confirm-password do not match';
      return;
    }

    this.working = true;

    firebase.database().ref('pending/users' )
      .orderByChild('email' )
      .equalTo( this.email )
      .once('value',snapshot => {
        const val = snapshot.val();
        if ( val ) {
          this.working = false;
          this.accounterrormessage = 'an account for this email-address already exists';
        } else {
          this.pending();
        }
      } );
  }

  private pending() {
    firebase.database().ref('pending/users' )
      .push()
      .set( {
        email: this.email.trim(),
        password: this.password.trim(),
        firstname: this.firstname.trim(),
        lastname: this.lastname.trim(),
        staus: 'verification-sending'
      } )
      .then(f => {
        this.working = false;
        console.log( f );
      } )
      .catch(r => {
        console.log( r );
        this.accounterrormessage = r.message;
      } );
  }

  ngOnDestroy(): void {}
}
