import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateApplicationComponent } from './candidate-application.component';

describe('CandidateApplicationComponent', () => {
  let component: CandidateApplicationComponent;
  let fixture: ComponentFixture<CandidateApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CandidateApplicationComponent]
    });
    fixture = TestBed.createComponent(CandidateApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
