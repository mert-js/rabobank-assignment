import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { ActivatedRoute } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockActivatedRoute = { snapshot: { paramMap: { get: () => null } } };

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [{ provide: ActivatedRoute, useValue: mockActivatedRoute }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
