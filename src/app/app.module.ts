import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LineChartComponent} from './line-chart/line-chart.component';
import {ChartModule} from "primeng/chart";

@NgModule({
    declarations: [
        AppComponent,
        LineChartComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ChartModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
