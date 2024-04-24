import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudioyexperrienciaComponent } from './estudioyexperriencia.component';

describe('EstudioyexperrienciaComponent', () => {
  let component: EstudioyexperrienciaComponent;
  let fixture: ComponentFixture<EstudioyexperrienciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstudioyexperrienciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudioyexperrienciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
