import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxEmojComponent } from './ngx-emoj.component';

describe('NgxEmojComponent', () => {
  let component: NgxEmojComponent;
  let fixture: ComponentFixture<NgxEmojComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxEmojComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxEmojComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
