import { Actions, ofType, Effect } from "@ngrx/effects";

import * as AuthActions from "./auth.actions";
import { switchMap, catchError, map, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { of } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      const url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
      const endpointUrl = url + environment.api_key;
      return this.http
        .post<AuthResponseData>(endpointUrl, {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true,
        })
        .pipe(
          map((resData) => {
            const expirationDate = new Date(
              new Date().getTime() + +resData.expiresIn * 1000
            );
            return new AuthActions.Login({
              email: resData.email,
              userId: resData.localId,
              token: resData.idToken,
              expirationDate: expirationDate,
            });
          }),
          catchError((errorResponse) => {
            let errorMessage = "An unknown error occurred!";
            if (!errorResponse.error || !errorResponse.error.error) {
              return of(new AuthActions.LoginFail(errorMessage));
            }
            switch (errorResponse.error.error.message) {
              case "EMAIL_EXISTS":
                errorMessage = "This email exists already";
                break;
              case "EMAIL_NOT_FOUND":
                errorMessage = "This email does not exist";
                break;
              case "INVALID_PASSWORD":
                errorMessage = "This password is not correct";
                break;
            }
            return of(new AuthActions.LoginFail(errorMessage));
          })
        );
    })
  );

  @Effect({ dispatch: false })
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.LOGIN),
    tap(() => {
      this.router.navigate(["/"]);
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
