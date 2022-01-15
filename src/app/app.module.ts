import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RcTcComponent} from './rc-tc/rc-tc.component';
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [
        AppComponent,
        RcTcComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CommonModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
