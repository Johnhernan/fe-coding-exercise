import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidCasesTableComponent } from './covid-cases-table.component';

describe('CovidCasesTableComponent', () => {
  let component: CovidCasesTableComponent;
  let fixture: ComponentFixture<CovidCasesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CovidCasesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CovidCasesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
