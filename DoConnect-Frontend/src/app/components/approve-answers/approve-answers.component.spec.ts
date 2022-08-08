import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveAnswersComponent } from './approve-answers.component';

describe('ApproveAnswersComponent', () => {
  let component: ApproveAnswersComponent;
  let fixture: ComponentFixture<ApproveAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveAnswersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
