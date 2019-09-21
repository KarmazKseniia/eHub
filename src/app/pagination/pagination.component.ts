import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PaginationService} from "../services/pagination.service";
import {takeUntil} from "rxjs/internal/operators";
import {Subject} from "rxjs/index";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() itemsCount: number;

  itemsPerPageSelect: FormControl;
  pages: Array<number>;

  private componentDestroyed: Subject<any> = new Subject();

  constructor(public pagination: PaginationService,
              private route: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit() {
    this.itemsPerPageSelect = new FormControl(this.pagination.OPTIONS[0]);
    this.pagination.init(1, this.itemsPerPageSelect.value, this.itemsCount);

    this.route.paramMap.pipe(takeUntil(this.componentDestroyed)).subscribe(
      params => this.pagination.changeCurrentPage(+params.get("currentPage")));
  }

  changeItemsPerPage(e) {
    this.pagination.changeItemsPerPage(this.itemsPerPageSelect.value);
    this.router.navigate(['/page/1']);
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }
}
