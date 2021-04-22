import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class JsonDataService {
  constructor(private http: HttpClient) {}

  getDataSource(link: string = "../../assets/data.json"): Observable<any> {
    return this.http.get(link);
  }

  getColumns(dataSource: Array<any>): Array<string> {
    return dataSource && dataSource.length ? Object.keys(dataSource[0]) : [];
  }

  sort(dataSource: Array<any>, column: string, order: boolean): Array<any> {
    return dataSource.sort((a1, b1) => {
      let a = prepare(a1[column]);
      let b = prepare(b1[column]);
      return (
        a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }) *
        (order ? 1 : -1)
      );
    });

    function prepare(str): string {
      return str
        .toString()
        .replace(/<mark>(.*?)<\/mark>/gi, "$1")
        .toLowerCase();
    }
  }
}
