import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenProcessesComponent } from './open-processes.component';

describe('OpenProcessesComponent', () => {
  let component: OpenProcessesComponent;
  let fixture: ComponentFixture<OpenProcessesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpenProcessesComponent]
    });
    fixture = TestBed.createComponent(OpenProcessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
