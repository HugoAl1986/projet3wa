import {Component,OnInit} from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { Movie } from 'src/app/model/movie';
import * as _ from 'lodash';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { DetailsMovieComponent } from 'src/app/component/details-movie/details-movie.component';

import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  authentication: string = 'none';
  bsModalRef?: BsModalRef;
  movieList: Movie[];
  searchMovie: any;
  page: number;
  labels: any = {
    previousLabel: '<',
    nextLabel: '>',
  };

  constructor(
    private service: MoviesService,
    private modalService: BsModalService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.service.getMovies().subscribe((datas) => {
      this.movieList = datas;
      let array = _.sortBy(this.movieList,['id']);
      this.movieList = array;
    });
    this.service.eventSearchMovie.subscribe(
      (data) => (this.searchMovie = data)
    );
    this.userService
      .checkIfIsauthenticated()
      .subscribe((data) => (this.authentication = data));
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
