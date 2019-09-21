import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JsonDataService {
  constructor(private http: HttpClient) {
  }

  getDataSource(): Observable<any> {
    return this.http.get("../../assets/data.json");
  }

  getColumns(dataSource: Array<any>): Array<string> {
    return (dataSource && dataSource.length) ? Object.keys(dataSource[0]) : [];
  }

  sort(dataSource: Array<any>, column: string, order: boolean): Array<any> {
    return dataSource.sort((a1, b1) => {
      let a = prepare(a1[column]);
      let b = prepare(b1[column]);
      if (parseFloat(a) && parseFloat(b)) {
        return order ? parseFloat(a) - parseFloat(b) : parseFloat(b) - parseFloat(a);
      }
      if (a < b) return order ? -1 : 1;
      else if (a > b) return order ? 1 : -1;
      else return 0;
    });

    function prepare(str): string {
      return str.toString().replace(/<mark>(.*?)<\/mark>/gi, '$1').toLowerCase();
    }
  }
}
