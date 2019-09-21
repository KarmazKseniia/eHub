import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() itemsCount: number;
  @Input() itemsPerPage: number = 5;
  @Output() itemsPerPageChanged = new EventEmitter<number>();
  OPTIONS = [5, 10, 15, 20]; // TODO: make config file
  itemsPerPageSelect: FormControl;

  constructor() {
  }

  ngOnInit() {
    this.itemsPerPageSelect = new FormControl(this.itemsPerPage);
  }

  changeItemsPerPage(e) {
    this.itemsPerPageChanged.emit(this.itemsPerPageSelect.value);
  }
}
