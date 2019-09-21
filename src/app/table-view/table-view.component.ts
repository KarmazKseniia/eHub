import {Component, OnInit} from '@angular/core';
import {JsonDataService} from "../services/json-data.service";
import {PaginationService} from "../services/pagination.service";
import {FormControl} from "@angular/forms";
import {SearchPipe} from "../services/search.pipe";
import {Router} from "@angular/router";

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
  providers: [SearchPipe]
})
export class TableViewComponent implements OnInit {

  dataColumns: Array<string>;
  dataSource: Array<any>;
  searchDataSource: Array<any>;

  order: boolean;
  sorted: string;
  searchPhrase: FormControl;

  constructor(private dataService: JsonDataService,
              private searchPipe: SearchPipe,
              private router: Router,
              public pagination: PaginationService) {
  }

  ngOnInit() {
    this.searchPhrase = new FormControl("");
    this.searchPhrase.valueChanges.subscribe(term => this.search(term));
    this.dataService.getDataSource().subscribe(data => {
      this.dataSource = data;
      this.searchDataSource = data;
      this.dataColumns = this.dataService.getColumns(data);
    });
  }

  sort(column: string) {
    this.order = !this.order;
    this.sorted = column;
    this.searchDataSource = this.dataService.sort(this.searchDataSource, column, this.order);
  }

  search(term: string) {
    this.searchDataSource = this.searchPipe.transform(this.dataSource, term);
    this.pagination.changeItemsCount(this.searchDataSource.length);
    this.router.navigate(['/page/1']);
  }

  saveValue(val: string, item: Object, column: string) {
    let elem = this.dataSource.find(function (element) {
      return JSON.stringify(element) === JSON.stringify(item);
    });
    elem[column] = val;
    this.searchPhrase.updateValueAndValidity();
  }
}
