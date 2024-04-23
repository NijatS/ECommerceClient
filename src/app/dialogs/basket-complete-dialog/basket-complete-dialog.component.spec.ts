import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketCompleteDialogComponent } from './basket-complete-dialog.component';

describe('BasketCompleteDialogComponent', () => {
  let component: BasketCompleteDialogComponent;
  let fixture: ComponentFixture<BasketCompleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasketCompleteDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BasketCompleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
