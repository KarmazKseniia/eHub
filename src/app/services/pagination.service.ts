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

  init(currentPage: number, itemsPerPage: number, itemsCount: number) {
    this.itemsCount = itemsCount;
    this.currentPage = currentPage;
    this.changeItemsPerPage(itemsPerPage);
  }

  changeItemsPerPage(itemsPerPage: number) {
    this.itemsPerPage = itemsPerPage || this.OPTIONS[0];
    this.prepareParams();
  }

  changeItemsCount(itemsCount: number) {
    this.itemsCount = itemsCount;
    this.prepareParams();
  }

  changeCurrentPage(page: number) {
    this.currentPage = page;
    this.prepareParams();
  }

  prepareParams() {
    this.params = {
      from: (this.currentPage - 1) * this.itemsPerPage + 1,
      to: Math.min(this.currentPage * this.itemsPerPage, this.itemsCount),
      pagesCount: Math.ceil(this.itemsCount / this.itemsPerPage)
    };
    this.pages = Array(this.params.pagesCount).fill(0).map((x, i) => i + 1);
  }
}
