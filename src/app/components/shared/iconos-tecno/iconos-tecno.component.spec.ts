import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconosTecnoComponent } from './iconos-tecno.component';

describe('IconosTecnoComponent', () => {
  let component: IconosTecnoComponent;
  let fixture: ComponentFixture<IconosTecnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconosTecnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconosTecnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
