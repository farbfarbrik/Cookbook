import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";

import * as fromApp from "../store/app.reducer";
import * as AuthActions from "./store/auth.actions";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  displayedMode: string;
  isLoading = false;
  error: string = null;
  private storeSub: Subscription;

  translationSub: Subscription;
  emailLabel: string;
  passwordLabel: string;
  loginLabel: string;
  signupLabel: string;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.storeSub = this.store.select("auth").subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
    });

    this.displayedMode = this.loginLabel;
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      this.store.dispatch(
        AuthActions.loginStart({ email: email, password: password })
      );
    } else {
      this.store.dispatch(
        AuthActions.signupStart({ email: email, password: password })
      );
    }

    form.reset();
  }

  onHandleError() {
    this.store.dispatch(AuthActions.clearError());
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }
}
