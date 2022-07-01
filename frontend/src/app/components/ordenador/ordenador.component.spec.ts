import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenadorComponent } from './ordenador.component';

describe('OrdenadorComponent', () => {
  let component: OrdenadorComponent;
  let fixture: ComponentFixture<OrdenadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
