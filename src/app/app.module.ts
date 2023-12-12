import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import {FormGroup} from "@angular/forms";
import {SharedModule} from "@shared/shared.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {InjectSessionInterceptor} from "@core/interceptors/inject-session.interceptor";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [CookieService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass: InjectSessionInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
