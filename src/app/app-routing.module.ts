import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LineChartComponent} from "./line-chart/line-chart.component";

const routes: Routes = [
    {path: '', component: LineChartComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
