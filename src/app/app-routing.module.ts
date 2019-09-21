import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TableViewComponent} from "./table-view/table-view.component";


const routes: Routes = [
  {path: 'page/:currentPage', component: TableViewComponent},
  {path: '**', redirectTo: 'page/1'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
