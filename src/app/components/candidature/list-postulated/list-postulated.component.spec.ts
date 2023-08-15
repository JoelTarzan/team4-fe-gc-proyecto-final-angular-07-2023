import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPostulatedComponent } from './list-postulated.component';

describe('ListPostulatedComponent', () => {
  let component: ListPostulatedComponent;
  let fixture: ComponentFixture<ListPostulatedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPostulatedComponent]
    });
    fixture = TestBed.createComponent(ListPostulatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
