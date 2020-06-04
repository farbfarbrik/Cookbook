import { createAction, props } from "@ngrx/store";

export const setLanguage = createAction(
  "[Header] Set Language",
  props<{ language: string }>()
);
