import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { Movie } from 'src/app/model/movie';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { DetailsMovieComponent } from 'src/app/component/details-movie/details-movie.component';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit{
  bsModalRef?: BsModalRef;
  movieList: Movie[];
  searchMovie: any;
  page: number;
  labels: any = {
    previousLabel: '<',
    nextLabel: '>',
  };

  constructor( private service: MoviesService, private modalService: BsModalService) {

  }

  ngOnInit(): void {
    this.service.getMovies().subscribe(datas => this.movieList =  datas); 
    this.service.eventSearchMovie.subscribe(data => this.searchMovie = data);
  }

  openModalWithComponent(data: Movie) {
    const initialState: ModalOptions = {
      initialState: {
        data,
      },
    };
    this.bsModalRef = this.modalService.show(
      DetailsMovieComponent,
      initialState
    );
  }
  scrollToUp() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
