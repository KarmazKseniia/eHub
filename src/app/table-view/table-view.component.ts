import {Component, OnInit} from '@angular/core';
import {JsonDataService} from "../services/json-data.service";

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit {
  dataColumns: Array<string>;
  dataSource: Array<any>;
  order: boolean;
  sorted: string;

  // @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private dataService: JsonDataService) {
  }

  ngOnInit() {
    this.dataService.getDataSource().subscribe(data => {
      this.dataSource = data;
      this.dataColumns = this.dataService.getColumns(data)
    });
  }

  sort(column) {
    this.order = !this.order;
    this.sorted = column;
    this.dataSource = this.dataService.sort(this.dataSource, column, this.order);
    console.log(this.dataSource)
  }

}
