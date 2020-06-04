import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
  OnDestroy,
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";

import * as fromApp from "./store/app.reducer";
import * as AuthActions from "./auth/store/auth.actions";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  languageSub: Subscription;

  constructor(
    private store: Store<fromApp.AppState>,
    @Inject(PLATFORM_ID) private platformId,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch(AuthActions.autoLogin());
    }

    // this.translateService.setDefaultLang("de");
    this.translateService.addLangs(["en", "de"]);
    this.translateService.setDefaultLang("en");

    this.languageSub = this.store.select("header").subscribe((headerState) => {
      this.translateService.use(headerState.language);
    });
  }

  ngOnDestroy() {
    this.languageSub.unsubscribe();
  }
}
