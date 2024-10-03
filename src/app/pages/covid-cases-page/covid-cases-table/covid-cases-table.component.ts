import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {CaseByDate} from "../../../shared/models/case-by-date.model";
import {CovidCasesPageService} from "../covid-cases-page.service";
import {Subject, takeUntil} from "rxjs";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {SharedModule} from "../../../shared/shared.module";

@Component({
  selector: 'app-covid-cases-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatProgressSpinner,
    SharedModule
  ],
  templateUrl: './covid-cases-table.component.html',
  styleUrl: './covid-cases-table.component.scss'
})
export class CovidCasesTableComponent implements OnInit, OnDestroy {
  // Table Variables
  tableColumns: string [] = ["Date", "CaseType", "Total"];
  dataSource: MatTableDataSource<CaseByDate> = new MatTableDataSource();

  private unsubscribeAll: Subject<null> = new Subject();
  constructor(
    public covidCasesPageService: CovidCasesPageService
  ) {}

  ngOnInit(): void {
    // Data source changes or refresh repopulates table data
    this.covidCasesPageService.tablePageData$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(res => {
        this.dataSource.data = res;
      });
  }

  // Unsubscribes to takeUntil Subscriptions
  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }
}
