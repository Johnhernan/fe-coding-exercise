import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidCasesPageComponent } from './covid-cases-page.component';

describe('CovidCasesPageComponent', () => {
  let component: CovidCasesPageComponent;
  let fixture: ComponentFixture<CovidCasesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CovidCasesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CovidCasesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
