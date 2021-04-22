import { Component, OnInit } from "@angular/core";
import { JsonDataService } from "../services/json-data.service";
import { FormControl, FormGroup } from "@angular/forms";
import { SearchPipe } from "../pipes/search.pipe";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs/index";
import { takeUntil } from "rxjs/internal/operators";

@Component({
  selector: "app-table-view",
  templateUrl: "./table-view.component.html",
  styleUrls: ["./table-view.component.scss"],
  providers: [SearchPipe],
})
export class TableViewComponent implements OnInit {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  dataColumns: Array<string>;
  dataSource: Array<any>;
  searchDataSource: Array<any>;

  order: boolean;
  sorted: string;
  searchPhrase: FormControl = new FormControl("");
  jsonLinkGroup: FormGroup;

  itemsToShow = {
    from: 0,
    to: 0,
  };

  private destroyed$: Subject<any> = new Subject();

  constructor(
    private dataService: JsonDataService,
    private searchPipe: SearchPipe,
    private router: Router
  ) {}

  ngOnInit() {
    this.jsonLinkGroup = new FormGroup({
      link: new FormControl("https://jsonplaceholder.typicode.com/photos"),
    });

    this.searchPhrase.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((term) => this.search(term));
    this.load(true);
  }

  sort(column: string) {
    this.order = !this.order;
    this.sorted = column;
    this.searchDataSource = this.dataService.sort(
      this.searchDataSource,
      column,
      this.order
    );
  }

  search(term: string) {
    this.searchDataSource = this.searchPipe.transform(this.dataSource, term);
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
    this.loading$.next(true);
    this.dataService
      .getDataSource(isDefault ? undefined : this.jsonLinkGroup.value.link)
      .subscribe(
        (data) => this.fetchJsonData(data),
        (err) => console.error(err),
        () => this.loading$.next(false)
      );
  }

  fetchJsonData(data) {
    this.dataSource = data;
    this.searchDataSource = data;
    this.dataColumns = this.dataService.getColumns(data);
    this.navigateToFirstPage();
  }

  navigateToFirstPage() {
    this.router.navigate(["/page/1"]);
  }

  changeItemsToShow(itemsToShow) {
    this.itemsToShow = itemsToShow;
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
