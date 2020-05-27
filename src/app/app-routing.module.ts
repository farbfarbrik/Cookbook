import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

const appRoutes: Routes = [
  { path: "", redirectTo: "/recipes", pathMatch: "full" },
  {
    path: "recipes",
    loadChildren: async () => {
      const module = await import("./recipes/recipes.module");
      return module.RecipesModule;
    },
  },
  {
    path: "shopping-list",
    loadChildren: async () => {
      const module = await import("./shopping-list/shopping-list.module");
      return module.ShoppingListModule;
    },
  },
  {
    path: "auth",
    loadChildren: async () => {
      const module = await import("./auth/auth.module");
      return module.AuthModule;
    },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
