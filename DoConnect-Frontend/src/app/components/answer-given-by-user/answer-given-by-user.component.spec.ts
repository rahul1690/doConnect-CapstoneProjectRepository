import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerGivenByUserComponent } from './answer-given-by-user.component';

describe('AnswerGivenByUserComponent', () => {
  let component: AnswerGivenByUserComponent;
  let fixture: ComponentFixture<AnswerGivenByUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerGivenByUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnswerGivenByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
