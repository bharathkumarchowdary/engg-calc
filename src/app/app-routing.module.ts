import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RcTcComponent} from "./rc-tc/rc-tc.component";

const routes: Routes = [
    {path: '', component: RcTcComponent},
    {path: 'rc_time_constant', component: RcTcComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
