import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  showMovieList:boolean = true;
  showUserList:boolean = false;
  colorActiveComponent:string;
  constructor() { }

  ngOnInit(): void {
    this.colorActiveComponent = '#ffc107';
  }

  displayComponent(value:any):void{
    if(value == "movies"){
      this.showMovieList = true;
      this.showUserList = false;
      this.colorActiveComponent = "#ffc107"
    }else{
      this.showUserList = true;
      this.showMovieList = false;
      this.colorActiveComponent = "black"
    }
  }

}
