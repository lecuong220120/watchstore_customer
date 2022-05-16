import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindByManufacturerComponent } from './find-by-manufacturer.component';

describe('FindByManufacturerComponent', () => {
  let component: FindByManufacturerComponent;
  let fixture: ComponentFixture<FindByManufacturerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindByManufacturerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindByManufacturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
