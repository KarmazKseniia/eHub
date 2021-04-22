import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], term: string): any {
    let columns = Object.keys(items[0]);

    items.map(function (item) {
      for (let key of columns) {
        item[key] = item[key].toString().replace(/<mark>(.*?)<\/mark>/gi, '$1');
      }
    });

    if (!term || !term.length) return items;

    return items.filter(function (item) {
      for (let key of columns) {
        let length = item[key].toString().length;
        item[key] = item[key].toString().replace(new RegExp(term, 'gi'), function (val) {
          return "<mark>" + val + "</mark>"
        });
        if (length < item[key].length) return true;
      }
      return false;
    });
  }
}
