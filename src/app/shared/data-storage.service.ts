import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { RecipesService } from "../recipes/recipes.service";
import { Recipe } from "../recipes/recipe.model";
import { map, tap, take, exhaustMap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class DataStorageService {
  backendUrl = "https://cookbook-1a1b6.firebaseio.com/";

  constructor(
    private http: HttpClient,
    private recipesService: RecipesService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    const storeUrl = this.backendUrl + "/recipes.json";
    this.http.put(storeUrl, recipes).subscribe((response) => {
      console.log(response);
    });
  }

  fetchRecipes() {
    const fetchUrl = this.backendUrl + "/recipes.json";
    return this.http.get<Recipe[]>(fetchUrl).pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        this.recipesService.setRecipes(recipes);
      })
    );
  }
}
