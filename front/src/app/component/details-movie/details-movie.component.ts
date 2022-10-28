import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { MoviesService } from '../../service/movies.service';
import { Movie } from '../../model/movie';
import { Category } from '../../model/category';
import { Router } from '@angular/router';
import {map} from 'rxjs';
import { SelectorListContext } from '@angular/compiler';


@Component({
  selector: 'app-details-movie',
  templateUrl: './details-movie.component.html',
  styleUrls: ['./details-movie.component.scss'],
})
export class DetailsMovieComponent implements OnInit {
  closeBtnName?: string;
  @Input() movie: Movie;
  @Output() newMovie: EventEmitter<Movie> = new EventEmitter<Movie>();

  profileForm: FormGroup;
  years: Array<number> = [];
  @Input() modalData?: BsModalRef;
  @Input() title: string;
  arrayCat: Array<Category> = [];
  array:Array<string>;
  arrayModify:Array<string> = [];
  error:boolean = false;

  constructor(public bsModalRef: BsModalRef,private service: MoviesService,private fb: FormBuilder,private route:Router
  ) {
    for (let i = 1870; i <= 2020; i++) {
      this.years.push(i);
    }
  }

  ngOnInit(): void {
    this.array = [];
    this.profileForm = this.fb.group({
      id: new FormControl(this.movie?.id),
      name: new FormControl(this.movie?.name, Validators.required),
      isAdult: new FormControl(this.movie?.isAdult, Validators.required),
      year: new FormControl(this.movie?.year, Validators.required),
      duration: new FormControl(this.movie?.duration, Validators.required),
      categories: this.fb.array<Category>(this.movie.categories == undefined ? [] : this.movie.categories)
    });
    this.addCategories();
    if(this.movie.categories != undefined){
      for(let i =0; i < this.movie.categories.length; i++){
        this.arrayModify.push(this.movie.categories[i].name);  
        this.array.push(this.movie.categories[i].name);
      }  
    }  
  }

  onSubmit() {
   
    if (this.title == 'Create movie') {
      console.log(this.array)
      this.service.saveMovie(this.profileForm.value).subscribe((data:Movie) => {   
      this.profileForm.value.categories = this.array;
      let movie = this.profileForm.value;
      this.service.saveMovieLinked(movie).subscribe(datas=>{
      this.newMovie.emit(datas);
      })
     });     
    }else if(this.title == 'Modify movie'){
      this.profileForm.value.categories = this.array;
      this.service.updateMovie(this.profileForm.value).subscribe(data=>{
      this.newMovie.emit(data);
      }
    );      
    }
  }

  changeIsAdult(e: any) {
    this.profileForm.patchValue({ isAdult: e.target.value });
  }

  get categories() {
    return this.profileForm.controls['categories'] as FormArray;
  }

  addCategories(): void {
    this.arrayCat.push(new Category('DRAMA'));
    this.arrayCat.push(new Category('ADVENTURE'));
    this.arrayCat.push(new Category('HISTORICAL'));
    this.arrayCat.push(new Category('COMEDY'));
    this.arrayCat.push(new Category('ACTION'));
    this.arrayCat.push(new Category('MUSICAL'));
    this.arrayCat.push(new Category('FANTASTIC'));
    this.arrayCat.push(new Category('HORROR'));
  }

  onClick(value: any, cat: string) {
    if (value.target.checked && this.array.indexOf(cat) == -1) {
      this.array.push(cat);
      console.log(this.profileForm);
    }
    if (value.target.checked == false && this.array.indexOf(cat) != -1) {
      let index = this.array.indexOf(cat);
      this.array.splice(index, 1);
    }
    
  }
}
