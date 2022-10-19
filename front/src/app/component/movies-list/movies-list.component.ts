import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/model/movie';
import { MoviesService } from 'src/app/service/movies.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
})
export class MoviesListComponent implements OnInit {
  @Input() showMovieList: boolean;
  moviesList: Movie[];
  color: 'black';
  newMovie: Movie;
  title: string;

  modalRef?: BsModalRef;

  constructor(private moviesService: MoviesService, private modalService: BsModalService, private route: Router
  ) {}

  ngOnInit(): void {
    this.moviesService
      .getMovies()
      .subscribe((datas) => (this.moviesList = datas));
  }

  openModal(template: TemplateRef<any>, value: any, movie:any) {
    if(value == "createMovie"){
      this.newMovie = new Movie();
      this.title = 'Create movie';
    }else{
      this.title = "Modify movie";
      this.newMovie = movie;
    }
    this.modalRef = this.modalService.show(template);
    
  }
  deleteMovie(movie:Movie){
    this.moviesService.deleteMovie(movie).subscribe(data=>{
      this.route.navigate(["movies"])
    });
  }
  addMovie($event:any){
    if(this.moviesList.indexOf($event.id) == -1){
      this.moviesList.push($event);
    }else{
      
    }
    
    console.log($event);
  }
}
