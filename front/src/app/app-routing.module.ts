import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { MoviesComponent } from './component/movies/movies.component';
import { DashboardAccessService } from './service/dashboard-access.service';

const routes: Routes = [

   {path: '', redirectTo:'movies', pathMatch:'full'},
   {path:'movies', component:MoviesComponent},
   {path:'dashboard', component:DashboardComponent, canActivate: [DashboardAccessService]},
   
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
