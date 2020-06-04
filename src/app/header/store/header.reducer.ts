import { Action, createReducer, on } from "@ngrx/store";

import * as HeaderActions from "./header.actions";

export interface State {
  language: string;
}

const initialState: State = { language: "en" };

export function headerReducer(
  headerState: State | undefined,
  headerAction: Action
) {
  return createReducer(
    initialState,
    on(HeaderActions.setLanguage, (state, action) => ({
      ...state,
      language: action.language,
    }))
  )(headerState, headerAction);
}
