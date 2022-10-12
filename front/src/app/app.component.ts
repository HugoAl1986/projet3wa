import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from './model/movie';
import { MoviesService } from './service/movies.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
 initialDatas: Movie[];
 innerWidth:any;
 @Input() inputDataFromNav:string;
 

 constructor(private service: MoviesService, private router: Router){
  
  } 

  getInput(data :any){
    this.inputDataFromNav = data;
    console.log(data);
  }

 ngOnInit(): void {
   
 }



}