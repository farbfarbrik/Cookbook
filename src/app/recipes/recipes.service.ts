import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipesService {
  private recipes: Recipe[] = [
    new Recipe(
      "Test Recipe",
      "This is simply a test",
      "https://cdn.pixabay.com/photo/2018/10/31/12/37/healthy-food-3785722_960_720.jpg",
      [new Ingredient("Meat", 1), new Ingredient("French Fried", 20)]
    ),
    new Recipe(
      "Not a Test Recipe",
      "This is no Test!",
      "https://cdn.pixabay.com/photo/2018/10/31/12/37/healthy-food-3785722_960_720.jpg",
      [new Ingredient("Buns", 2), new Ingredient("Meat", 15)]
    ),
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
