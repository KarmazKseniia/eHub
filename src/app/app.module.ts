import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TableViewComponent} from './table-view/table-view.component';
import {HttpClientModule} from "@angular/common/http";
import {PaginationComponent} from './pagination/pagination.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SearchPipe} from './services/search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TableViewComponent,
    PaginationComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
