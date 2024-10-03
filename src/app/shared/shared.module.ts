import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CovidCasesApiService} from "./services/covid-statistics.api.service";

@NgModule({
  declarations: [],
  providers: [
    CovidCasesApiService
  ],
  exports: [
    CommonModule
  ]
})
export class SharedModule { }
