import { Injectable } from '@angular/core';
import { Movie} from '../model/movie';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { UserService } from './user.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  token: string;
  moviesUrl: string;
  searchMovie : any = new Subject();

  constructor(private http: HttpClient, private userService: UserService) {
    this.moviesUrl = 'http://localhost:8080/api/movies';
  }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.moviesUrl);
  }

  getToken() {
    return this.userService.token.subscribe((data) => (this.token = data));
  }

  saveMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.moviesUrl + '/savemovie', movie);
  }

  saveMovieLinked(movie:Movie):Observable<Movie>{
    let categories = movie.categories;
    let datas = categories?.join(",");
    if(datas != undefined){
      encodeURIComponent(datas.trim());
    }
    return this.http.put<Movie>(this.moviesUrl + '/linkcattomovies/' + datas + "/" + movie.name, null);
  }


  updateMovie(movie: Movie):Observable<Movie> {
    const categories = movie.categories;
    const datas = categories?.join(",");
    const newMovie =new Movie();
    newMovie.setDuration(movie.duration);
    newMovie.setYear(movie.year);
    newMovie.setIsAdult(movie.isAdult);
    newMovie.setName(movie.name);
    return this.http.put<Movie>(this.moviesUrl + '/putmovie/' + datas + "/" + movie.id, newMovie);
  }

  deleteMovie(movie:Movie):Observable<any>{
    return this.http.delete<any>(this.moviesUrl + "/delete/" + movie.id)
  }

}
