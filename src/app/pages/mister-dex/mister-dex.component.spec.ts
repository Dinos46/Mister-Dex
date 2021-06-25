import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisterDexComponent } from './mister-dex.component';

describe('MisterDexComponent', () => {
  let component: MisterDexComponent;
  let fixture: ComponentFixture<MisterDexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisterDexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisterDexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
