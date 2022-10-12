import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalOptions } from 'ngx-bootstrap/modal';
import { MoviesService } from '../../service/movies.service';
import { Movie } from '../../model/movie';

@Component({
  selector: 'app-details-movie',
  templateUrl: './details-movie.component.html',
  styleUrls: ['./details-movie.component.scss'],
})
export class DetailsMovieComponent implements OnInit {
  closeBtnName?: string;
  movie: any;
  profileForm: FormGroup;
  years: Array<number> = [];

  constructor(
    public bsModalRef: BsModalRef,
    public options: ModalOptions,
    private service: MoviesService
  ) {
    for (let i = 1870; i <= 2000; i++) {
      this.years.push(i);
    }
    this.movie = this.options.initialState?.['data'];
  }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      id: new FormControl(this.movie?.id),
      name: new FormControl(this.movie?.name),
      isAdult: new FormControl(this.movie?.isAdult, Validators.required),
      year: new FormControl(this.movie?.year),
      duration: new FormControl(this.movie?.duration, Validators.required),
      categories: new FormControl(this.movie?.categories, Validators.required),
    });
  }

  onSubmit() {
    this.service.updateMovie(this.profileForm.value);
  }

  changeIsAdult(e: any) {
    this.profileForm.patchValue({ isAdult: e.target.value });
  }
}
