import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionsUserComponent } from './functions-user.component';

describe('FunctionsUserComponent', () => {
  let component: FunctionsUserComponent;
  let fixture: ComponentFixture<FunctionsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunctionsUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
