import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoralsComponent } from './corals.component';

describe('CoralsComponent', () => {
  let component: CoralsComponent;
  let fixture: ComponentFixture<CoralsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoralsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoralsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
