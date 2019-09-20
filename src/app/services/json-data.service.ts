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

  getColumns(dataSource): Array<string> {
    return (dataSource && dataSource.length) ? Object.keys(dataSource[0]) : [];
  }

  sort(dataSource, column, order): Array<any> {
    return dataSource.sort((a, b) => {
      if (a[column] < b[column]) return order ? -1 : 1;
      else if (a[column] > b[column]) return order ? 1 : -1;
      else return 0;
    });
  }
}
