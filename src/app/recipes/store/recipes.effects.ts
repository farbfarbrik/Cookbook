import { Actions, Effect, ofType, createEffect } from "@ngrx/effects";
import { HttpClient } from "@angular/common/http";
import { switchMap, map, withLatestFrom } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import * as RecipesActions from "./recipes.action";
import { Recipe } from "../recipe.model";
import * as fromApp from "../../store/app.reducer";

@Injectable()
export class RecipesEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}

  fetchRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.fetchRecipes),
      switchMap((fetchAction) => {
        const fetchUrl = "https://cookbook-1a1b6.firebaseio.com/recipes.json";
        return this.http.get<Recipe[]>(fetchUrl);
      }),
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      map((recipes) => {
        return RecipesActions.setRecipes({ recipes });
      })
    )
  );

  storeRecipes$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RecipesActions.storeRecipes),
        withLatestFrom(this.store.select("recipes")),
        switchMap(([actionData, recipesState]) => {
          const storeUrl = "https://cookbook-1a1b6.firebaseio.com/recipes.json";
          return this.http.put(storeUrl, recipesState.recipes);
        })
      ),
    { dispatch: false }
  );
}
