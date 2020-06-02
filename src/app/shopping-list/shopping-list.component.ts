import { Component, OnInit } from "@angular/core";
import { Subscription, Observable } from "rxjs";
import { Store } from "@ngrx/store";

import { Ingredient } from "../shared/ingredient.model";
import * as ShoppingListActions from "./store/shopping-list.actions";
import * as fromApp from "../store/app.reducer";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.ingredients = this.store.select("shoppingList");
  }

  onEditItem(id: number) {
    this.store.dispatch(ShoppingListActions.startEdit({ index: id }));
  }
}
