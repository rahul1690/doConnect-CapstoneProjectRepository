import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAskedByUserComponent } from './question-asked-by-user.component';

describe('QuestionAskedByUserComponent', () => {
  let component: QuestionAskedByUserComponent;
  let fixture: ComponentFixture<QuestionAskedByUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionAskedByUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionAskedByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
