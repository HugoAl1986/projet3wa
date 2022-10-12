import { EventEmitter, Injectable } from '@angular/core';
import { Movie } from '../model/movie';
import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { from, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  usersUrl: string;
  eventSearchMovie:EventEmitter<any> = new EventEmitter<any>;

  constructor(private http: HttpClient) { 
    this.usersUrl = 'http://localhost:8080/api/movies';
  }

  getMovies(): Observable<Movie[]>{
    return this.http.get<Movie[]>(this.usersUrl);
  }

  emitEvent(data:any){
    this.eventSearchMovie.emit(data);
  }

  updateMovie(movie:Movie){
  
   }

  
  
}
