import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMainComponent } from './about-main.component';

describe('AboutMainComponent', () => {
  let component: AboutMainComponent;
  let fixture: ComponentFixture<AboutMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutMainComponent]
    });
    fixture = TestBed.createComponent(AboutMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
