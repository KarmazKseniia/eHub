import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { takeUntil } from "rxjs/internal/operators";
import { Subject } from "rxjs/index";
import { IItemsToShow } from "../interfaces/paggination.interface";

export const ITEMS_OPTIONS = [5, 10, 15, 25, 50];

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.scss"],
})
export class PaginationComponent implements OnInit {
  @Input() itemsCount: number;
  @Input() loading: boolean = false;
  @Output() change: EventEmitter<IItemsToShow> = new EventEmitter();

  itemsPerPageModel: FormControl;
  current: number = 1;
  middleCounter: Array<number>;
  totalPagesCount: number;
  itemsToShow: IItemsToShow;

  private destroyed$: Subject<boolean> = new Subject();

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.itemsPerPageModel = new FormControl(this.itemsPerPageOptions[0]);

    this.route.paramMap.pipe(takeUntil(this.destroyed$)).subscribe((params) => {
      const page = parseInt(params.get("currentPage"));
      if (!isNaN(page) && page < this.totalPagesCount) this.current = page;
    });

    this.init();
  }

  init(): void {
    const itemsPerPage = this.itemsPerPageModel.value;
    this.totalPagesCount = Math.ceil(this.itemsCount / itemsPerPage);
    this.changeItemsToShow();
    this.fillMiddleCounter();
  }

  changeItemsPerPage(): void {
    this.init();
    this.router.navigate(["/page/1"]);
  }

  fillMiddleCounter(): void {
    let from: number;
    let to: number;

    if (this.totalPagesCount > 1 && this.totalPagesCount <= 5) {
      from = 2;
      to = this.totalPagesCount - 1;
    } else if (this.totalPagesCount > 5) {
      if (this.showLeftDots() && this.showRightDots()) {
        from = this.current - 1;
        to = this.current + 1;
      } else if (this.current >= this.totalPagesCount - 2) {
        from = this.totalPagesCount - 3;
        to = this.totalPagesCount - 1;
      } else if (this.current < 5) {
        from = 2;
        to = Math.min(this.totalPagesCount - 1, 4);
      }
    }

    this.middleCounter = [];
    for (let i = from; i <= to; i++) {
      this.middleCounter.push(i);
    }
  }

  showLeftDots() {
    return this.totalPagesCount > 5 && this.current > 3;
  }

  showRightDots() {
    return this.totalPagesCount > 5 && this.current < this.totalPagesCount - 2;
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  get itemsPerPageOptions(): Array<number> {
    return ITEMS_OPTIONS;
  }

  changeItemsToShow() {
    const itemsPerPage = this.itemsPerPageModel.value;

    this.itemsToShow = {
      from: (this.current - 1) * itemsPerPage + 1,
      to: Math.min(this.current * itemsPerPage, this.itemsCount),
    };
    this.change.emit(this.itemsToShow);
  }

  changePage(page: number): void {
    if (!page || page < 1 || page > this.totalPagesCount) {
      return;
    }
    this.router.navigate([`/page/${page}`]);
  }
}
