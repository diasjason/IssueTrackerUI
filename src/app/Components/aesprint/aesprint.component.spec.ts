import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AESprintComponent } from './aesprint.component';

describe('AESprintComponent', () => {
  let component: AESprintComponent;
  let fixture: ComponentFixture<AESprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AESprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AESprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
