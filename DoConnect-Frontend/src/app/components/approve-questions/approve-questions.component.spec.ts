import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveQuestionsComponent } from './approve-questions.component';

describe('ApproveQuestionsComponent', () => {
  let component: ApproveQuestionsComponent;
  let fixture: ComponentFixture<ApproveQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
