import {Component, OnInit} from '@angular/core';
import {JsonDataService} from "../services/json-data.service";
import {PaginationService} from "../services/pagination.service";
import {FormControl, FormGroup} from "@angular/forms";
import {SearchPipe} from "../services/search.pipe";
import {Router} from "@angular/router";
import {Subject} from "rxjs/index";
import {takeUntil} from "rxjs/internal/operators";

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
  jsonLinkGroup: FormGroup;

  private componentDestroyed: Subject<any> = new Subject();

  constructor(private dataService: JsonDataService,
              private searchPipe: SearchPipe,
              private router: Router,
              public pagination: PaginationService) {
  }

  ngOnInit() {
    this.jsonLinkGroup = new FormGroup({
      link: new FormControl("https://jsonplaceholder.typicode.com/photos")
    });

    this.searchPhrase = new FormControl("");
    this.searchPhrase.valueChanges.pipe(takeUntil(this.componentDestroyed)).subscribe(term => this.search(term));
    this.load(true);
  }

  sort(column: string) {
    this.order = !this.order;
    this.sorted = column;
    this.searchDataSource = this.dataService.sort(this.searchDataSource, column, this.order);
  }

  search(term: string) {
    this.searchDataSource = this.searchPipe.transform(this.dataSource, term);
    this.pagination.changeItemsCount(this.searchDataSource.length);
    this.navigateToFirstPage();
  }

  saveValue(val: string, item: Object, column: string) {
    let elem = this.dataSource.find(function (element) {
      return JSON.stringify(element) === JSON.stringify(item);
    });
    elem[column] = val;
    this.searchPhrase.updateValueAndValidity();
  }

  load(isDefault) {
    this.dataService.getDataSource(isDefault ? '' : this.jsonLinkGroup.value.link)
      .subscribe(data => this.fetchJsonData(data));
  }

  fetchJsonData(data) {
    this.dataSource = data;
    this.searchDataSource = data;
    this.dataColumns = this.dataService.getColumns(data);
    this.pagination.init(1, this.pagination.itemsPerPage, this.searchDataSource.length);
    this.navigateToFirstPage();
  }

  navigateToFirstPage() {
    this.router.navigate(['/page/1']);
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }
}
