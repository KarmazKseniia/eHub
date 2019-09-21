import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  OPTIONS = [5, 10, 15, 25, 50];
  itemsCount: number;
  itemsPerPage: number;
  currentPage: number;
  params: any;
  pages: Array<number>;

  constructor() {
  }

  init(currentPage, itemsPerPage, itemsCount) {
    this.itemsCount = itemsCount;
    this.currentPage = currentPage;
    this.changeItemsPerPage(itemsPerPage);
  }

  changeItemsPerPage(itemsPerPage) {
    this.itemsPerPage = itemsPerPage || this.OPTIONS[0];
    this.params = {
      from: (this.currentPage - 1) * itemsPerPage + 1,
      to: Math.min(this.currentPage * itemsPerPage, this.itemsCount),
      pagesCount: Math.ceil(this.itemsCount / itemsPerPage)
    };
    this.pages = Array(this.params.pagesCount).fill(0).map((x, i) => i + 1);
  }
}
