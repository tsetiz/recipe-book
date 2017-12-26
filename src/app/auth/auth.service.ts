import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import * as fromApp from "../store/app.reducers";
import {Store} from "@ngrx/store";
import * as AuthActions from './store/auth.actions';

@Injectable()
export class AuthService {

  constructor(private router: Router, private store:Store<fromApp.AppState>) {}

  signupUser(email: string, password: string){
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        user => {
          this.store.dispatch(new AuthActions.Signup());
        }
      )
      .catch(
      error => console.log(error)
    );
  }

  signInUser(email: string, password: string){
    firebase.auth().signInWithEmailAndPassword(email, password).then(
      (response) => {
        this.store.dispatch(new AuthActions.Signin())
        this.router.navigate(['/']);
        firebase.auth().currentUser.getIdToken().then(
          (token: string) => this.store.dispatch(new AuthActions.SetToken(token))
        );
      }
    ).catch(
      error => console.log(error)
    );
  }

  logOut(){
    firebase.auth().signOut();
    this.store.dispatch(new AuthActions.Logout())
  }
}