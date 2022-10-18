import { TestBed } from '@angular/core/testing';
import { MOVIELIST } from '../mock-movie-list';
import { Movie } from '../model/movie';

import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;
  let movie: Movie = {
    id: 'tt0000001',
    titleType: 'short',
    primaryTitle: 'Carmencita',
    originalTitle: 'Carmencita',
    isAdult: '2',
    startYear: '1922',
    endYear: '1986',
    runtimeMinutes: '1500',
    genres: 'Documentary,Short',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoviesService);
  });

  it('should return the movie list', () => {
    expect(service.getMovies()).toEqual(MOVIELIST);
  });
  it('should update the movie list', () => {
    service.updateMovie(movie);
    expect(MOVIELIST).toContain(movie);
  });
});
