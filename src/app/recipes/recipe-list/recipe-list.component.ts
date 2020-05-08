import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { Recipe } from "../recipe.model";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"],
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe(
      "Test Recipe",
      "This is simply a test",
      "https://cdn.pixabay.com/photo/2018/10/31/12/37/healthy-food-3785722_960_720.jpg"
    ),
    new Recipe(
      "Not a Test Recipe",
      "This is no Test!",
      "https://cdn.pixabay.com/photo/2018/10/31/12/37/healthy-food-3785722_960_720.jpg"
    ),
  ];

  constructor() {}

  ngOnInit() {}

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
