import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritedMoviesViewComponent } from './favorited-movies-view.component';

describe('FavoritedMoviesViewComponent', () => {
  let component: FavoritedMoviesViewComponent;
  let fixture: ComponentFixture<FavoritedMoviesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritedMoviesViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritedMoviesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
