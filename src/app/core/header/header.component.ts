import {Component, OnInit} from '@angular/core';
import * as fromApp from '../../store/app.reducers';
import {Store} from '@ngrx/store';
import {Observable} from "rxjs/Observable";
import * as authState from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';
import * as RecipeActions from '../../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl:  './header.component.html'
})

export class HeaderComponent implements OnInit{

  authState: Observable<authState.State>;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.authState = this.store.select('auth');
  }

  onSaveData(){
   this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onFetchData(){
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogOut(){
    this.store.dispatch(new AuthActions.Logout());
  }

}
