import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {DateSpan} from "../models/date-span.model";
import {isValid} from "date-fns";

@Injectable({
  providedIn: 'root'
})
export class CovidCasesApiService {
  private readonly dataEndpoint: string;

  constructor(private http: HttpClient) {
    // Allows us to get the proxy's location and append the route we need
    this.dataEndpoint = window.location.origin + '/cases/covid-19/grouped-by-earliest-positive-diagnostic-date';
  }

  getCovidStatistics(dates: DateSpan): Observable<any> {
    const {startDate,  endDate} = dates;
    const startDateObject = new Date(startDate);
    const endDateObject = new Date(endDate);

    // Verify these objects are valid dates
    if (isValid(startDateObject) && isValid(endDateObject)) {
      let {startString, endString} = {
        startString: 'StartDate=',
        endString: 'EndDate='
      };
      // Converts to Utc and makes sure this string is URL safe
      startString += encodeURIComponent(startDateObject.toISOString());
      endString += encodeURIComponent(endDateObject.toISOString());

      return this.http.get(this.dataEndpoint + '?' + startString + '&' + endString)
    }

    return of([]); // Returns empty array on failed dates
  }
}
