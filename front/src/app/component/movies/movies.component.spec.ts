import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { MoviesComponent } from './movies.component';
import { DetailsMovieComponent } from 'src/app/component/details-movie/details-movie.component';
import { MoviesService } from 'src/app/service/movies.service';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoviesComponent, DetailsMovieComponent],
      imports: [
        NgxPaginationModule,
        Ng2SearchPipeModule,
        TranslateModule.forRoot(),
      ],
      providers: [BsModalService, TranslateService, MoviesService],
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('movieList should be undefined', () => {
    component.movieList = undefined;
    expect(component.movieList).toBeUndefined();
  });

  it('movieList Length might be 1', () => {
    component.movieList = [
      {
        id: 'tt0000001',
        titleType: 'short',
        primaryTitle: 'Carmencita',
        originalTitle: 'Carmencita',
        isAdult: '0',
        startYear: '1894',
        endYear: '\\N',
        runtimeMinutes: '1',
        genres: 'Documentary,Short',
      },
    ];
    expect(component.movieList).toHaveSize(1);
  });
});
