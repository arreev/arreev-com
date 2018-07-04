
import { Component,OnInit,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Invite } from './invite';

import * as firebase from 'firebase';

@Component({
  selector: 'app-accept-invitation',
  templateUrl: './accept-invitation.component.html',
  styleUrls: ['./accept-invitation.component.css'],
  animations: []
})
export class AcceptInvitationComponent implements OnInit,OnDestroy
{
  id = '';
  name = '';
  email = '';
  password = '';
  errormessage = '';
  declined = false;
  expired = false;
  errored = false;
  ready = false;
  working = false;
  accepted = false;

  private invite?: Invite = null;

  constructor( private router:Router ) {
    console.log( 'AcceptInvitationComponent' );

    const url:URL = new URL( 'me:'+router.url );
    this.id = url.searchParams.get( 'id' );
    this.name = url.searchParams.get( 'name' );
  }

  ngOnInit(): void {
    if ( !this.id || !this.name ) {
      this.router.navigate( [ 'unacceptable' ] );
      return;
    }

    this.getInvitation();
  }

  onNotYou() { this.decline(); }
  onCreate() {}
  onCreateFreeAccountNow() { this.createFreeAccountNow(); }
  onSignIn() { this.signIn(); }
  onDecline() { this.decline(); }

  ngOnDestroy(): void {}

  private getInvitation() {
    firebase.database().ref('invitations' ).child( this.id ).once('value' ).then(
      snapshot => {
        this.invite = snapshot.val() as Invite;
        this.invited();
      }
    ).catch(e => {
      console.log( e );
      this.expired = true;
    } );
  }

  private invited() {
    if ( !this.invite || this.isExpired( this.invite ) ) {
      this.invite = null;
      this.expired = true;
      return;
    }

    if ( this.invite.status === 'accepted' ) {
      this.accepted = true;
      this.ready = false;
      return;
    }

    this.email = this.invite.email;
    this.ready = true;
  }

  private signIn() {
    this.working = true;
    this.errormessage = '';

    firebase.auth()
      .signInWithEmailAndPassword( this.email,this.password )
      .then(() => {
        this.signInSuccess();
      } )
      .catch(e => {
        this.signInOrUpdateFail( e );
      } );
  }

  private signInSuccess() {
    const user:firebase.User = firebase.auth().currentUser;
    const invitation = {
      email: this.invite.email,
      ownerid: this.invite.ownerid,
      personid: this.invite.personid,
      status: 'accepted',
      accepted: user.uid
    };
    firebase.database().ref('invitations' ).child( this.id )
      .update( invitation )
      .then(() => {
        this.accepted = true;
      } );

    this.working = false;

    firebase.auth()
      .signOut()
      .then(() => {} )
      .catch(e => console.log( e ) );
  }

  private signInOrUpdateFail( e ) {
    this.working = false;
    this.errormessage = e.message;
  }

  private isExpired( invite:Invite ) : boolean {
    // TODO
    return false;
  }

  private decline() {
    this.remove();
    this.declined = true;
  }

  private remove() {
    firebase.database().ref('invitations' ).child( this.id )
      .remove()
      .then(() => { console.log( 'removed' ); } )
      .catch(e => console.log( e ) );
  }

  private acceptanceError( r ) {
    this.remove();
    this.errored = true;
  }

  private createFreeAccountNow() {
    const queryParams = {
      action: 'create',
      email: this.email
    };
    this.router.navigate( [ 'home' ],{ queryParams:queryParams } );
  }
}

