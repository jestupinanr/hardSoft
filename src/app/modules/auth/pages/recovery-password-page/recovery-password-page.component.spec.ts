import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryPasswordPageComponent } from './recovery-password-page.component';

describe('RecoveryPasswordPageComponent', () => {
  let component: RecoveryPasswordPageComponent;
  let fixture: ComponentFixture<RecoveryPasswordPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoveryPasswordPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoveryPasswordPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
