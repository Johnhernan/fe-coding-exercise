import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
  MatDateRangeInput, MatDateRangePicker,
  MatEndDate,
  MatStartDate
} from "@angular/material/datepicker";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {CovidCasesTableComponent} from "./covid-cases-table/covid-cases-table.component";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {SharedModule} from "../../shared/shared.module";
import {CovidCasesPageService} from "./covid-cases-page.service";
import {debounceTime, Subject, takeUntil, tap} from "rxjs";
import {MatInputModule} from "@angular/material/input";
import {addDays, differenceInDays, endOfWeek, startOfWeek} from "date-fns";

@Component({
  selector: 'app-covid-cases-page',
  standalone: true,
  imports: [
    MatDatepickerInput,
    MatDateRangeInput,
    MatFormField,
    CovidCasesTableComponent,
    MatStartDate,
    MatEndDate,
    MatPaginator,
    SharedModule,
    MatDatepickerToggle,
    MatDatepicker,
    MatInputModule,
    MatLabel,
    MatHint,
    ReactiveFormsModule,
    MatDateRangePicker
  ],
  templateUrl: './covid-cases-page.component.html',
  styleUrl: './covid-cases-page.component.scss'
})
export class CovidCasesPageComponent implements OnInit,OnDestroy {
  caseInputForm: FormGroup;

  private unsubscribeAll: Subject<null> = new Subject();
  constructor(
    private formBuilder: FormBuilder,
    protected covidCasesPageService: CovidCasesPageService
  ) {
    this.caseInputForm = this.generateFormGroup();
  }

  ngOnInit(): void {
    this.subscribeToDateFieldChanges();
    this.covidCasesPageService.fetchCaseData(this.caseInputForm.value); // Initial API Call
  }

  // Unsubscribes to takeUntil Subscriptions
  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  /**
   * Creates a FormGroup instance containing start and end date controls for date inputs
   *
   * @private
   *
   * @returns {FormGroup} A FormGroup with startDate and endDate controls initialized to the current date.
   */
  private generateFormGroup(): FormGroup {
    const today: Date = new Date();

    return this.formBuilder.group({
      startDate: startOfWeek(today),
      endDate: endOfWeek(today)
    });
  }

  private subscribeToDateFieldChanges(): void {
    this.caseInputForm.valueChanges
      .pipe(
        takeUntil(this.unsubscribeAll),
        // Dates cannot exceed one week we adjust the end date here if the difference is too large
        tap(res => {
          const {startDate, endDate} = res;
          const timeDifference = differenceInDays(endDate, startDate);
          if (timeDifference > 7) {
            this.caseInputForm.get("endDate")?.setValue(addDays(startDate, 7));
          }
        }),
        debounceTime(1500)
      )
      .subscribe((res) => {
        this.covidCasesPageService.fetchCaseData(res);
      });
  }

  handlePage(event: PageEvent) {
    this.covidCasesPageService.setPageEvent(event);
    this.covidCasesPageService.refreshPageData();
  }
}
