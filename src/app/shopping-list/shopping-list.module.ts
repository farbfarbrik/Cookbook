import { NgModule } from "@angular/core";

import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { AuthGuard } from "../auth/auth.guard";
import { SharedModule } from "../shared/shared.module";

const routes: Routes = [
  {
    path: "",
    component: ShoppingListComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [FormsModule, RouterModule.forChild(routes), SharedModule],
})
export class ShoppingListModule {}
