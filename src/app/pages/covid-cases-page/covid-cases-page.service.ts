import {Injectable, signal, WritableSignal} from '@angular/core';
import {BehaviorSubject, finalize, map, take} from "rxjs";
import {CovidCasesApiService} from "../../shared/services/covid-statistics.api.service";
import {PageEvent} from "@angular/material/paginator";
import {CaseByDate} from "../../shared/models/case-by-date.model";

@Injectable({
  providedIn: 'root'
})
export class CovidCasesPageService {
  // All records are kept and cached. Our single source of truth.
  private caseData: BehaviorSubject<CaseByDate[] > = new BehaviorSubject<CaseByDate[]>([]);

  /**
   * Outgoing table data must be taken from our behavior subject.
   * This also takes care of getting the correct page information.
   *
   * @public
   * @memberof CovidCasesTableComponent
   */
  tablePageData$ = this.caseData.asObservable().pipe(
    map(res => {
      // Indicates starting point for where we need to cut this array. We pivot towards this value.
      const pivot: number = this.pageEvent().pageIndex * this.pageEvent().pageSize;
      return res.slice(pivot, pivot + this.pageEvent().pageSize);
    })
  );

  pageEvent: WritableSignal<PageEvent> = signal({
    pageIndex: 0,
    pageSize: 10,
    length: 0
  });

  hasLoaded: WritableSignal<boolean> = signal(false);

  constructor(private covidCaseApiService: CovidCasesApiService) { }

  /**
   * Fetches case data for a specific date range.
   *
   * @param {object} dateFormValues - An object containing the start and end dates for the data query.
   * @param {string} dateFormValues.startDate - The starting date in string format (e.g., YYYY-MM-DD).
   * @param {string} dateFormValues.endDate - The ending date in string format (e.g., YYYY-MM-DD).
   *
   * @returns {void} - This function does not return a value, but updates internal state and emits data.
   */
  fetchCaseData(dateFormValues: {startDate: string, endDate: string}): void {
    this.covidCaseApiService.getCovidStatistics(dateFormValues)
      .pipe(
        take(1), // Only take the first emission
        finalize(() => { // Whichever outcome, Always send the has loaded signal to true
          this.hasLoaded.update(() => true);
        })
      )
      .subscribe((res: CaseByDate []) => {
        if (res?.length) {
          this.pageEvent().length = res.length;
          this.caseData.next(res)
        }
    });
  }

  refreshPageData(): void {
    this.caseData.next(this.caseData.value);
  }

  setPageEvent(event:PageEvent): void {
    this.pageEvent.set(event);
  }
}
