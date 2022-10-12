import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { MoviesComponent } from './component/movies/movies.component';

const routes: Routes = [
  
   {path:'login', component:LoginComponent},
   {path:'movies', component:MoviesComponent},
   {path: '', redirectTo:'movies', pathMatch:'full'}
   

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
