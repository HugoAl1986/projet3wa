package com.projet3wa.movieapp.controller;


import com.projet3wa.movieapp.exceptions.ObjectExistsInDatabase;
import com.projet3wa.movieapp.exceptions.ObjectInvalidArgument;
import com.projet3wa.movieapp.model.Category;
import com.projet3wa.movieapp.model.Movie;
import com.projet3wa.movieapp.repository.CategoryRepository;
import com.projet3wa.movieapp.repository.MovieRepository;
import com.projet3wa.movieapp.service.CategoryService;
import com.projet3wa.movieapp.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;


@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = "*")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CategoryService categoryService;
    @PostMapping(value = "/savemovie")
    public ResponseEntity<Movie> create(@RequestBody Movie movie) throws ObjectExistsInDatabase {
            Movie movieCreated = movieService.saveMovie(movie);
            return new ResponseEntity<>(movieCreated, HttpStatus.CREATED);
    }

    @PostMapping(value = "/savecategory")
    public ResponseEntity<Category> createCategory(@RequestBody Category category) throws ObjectExistsInDatabase, ObjectInvalidArgument {
            Category newCat = categoryService.saveCategory(category);
            return new ResponseEntity<>(newCat, HttpStatus.CREATED);
        }


    @GetMapping()
    public ResponseEntity<List<Movie>> getMovies() {
        List<Movie> listMovies = movieService.getMovies();
        return new ResponseEntity<>(listMovies, HttpStatus.ACCEPTED);
    }

    @PutMapping(value = "/linkcattomovies/{categories}/{movie}")
    public ResponseEntity<Movie> linkCatToMovie(@PathVariable String[] categories, @PathVariable String movie) throws ObjectExistsInDatabase, ObjectInvalidArgument {
        // get movie from DB
        Movie movieFromDb = movieService.findMovieByName(movie);
        // transform String[] to set
        Set<Category>  set = categoryService.stringToSet(categories);
        // add set from existin
        set = categoryService.getCategoryDBFromSet(set);
        // add set to Movie
        movieFromDb.setCategories(set);
        // save movie to DB
        Movie movieUpdated = movieService.saveMovie(movieFromDb);
      return new ResponseEntity<>(movieUpdated, HttpStatus.CREATED);
    }

    @PutMapping(value = "/putmovie/{categories}/{idMovie}")
    public ResponseEntity<Movie> putMovie(@RequestBody Movie newMovie, @PathVariable String[] categories, @PathVariable Long idMovie) throws ObjectExistsInDatabase, ObjectInvalidArgument {
        // transform String[] to set
        Set<Category>  set = categoryService.stringToSet(categories);
        // add set from existin
        Set<Category> setFromDb = categoryService.getCategoryDBFromSet(set);
        Movie movieUpdated = movieService.putMovie(newMovie, idMovie, setFromDb);
        return new ResponseEntity<>(movieUpdated, HttpStatus.ACCEPTED);
    }
    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<?> deleteMovie(@PathVariable Long id){
        movieService.deleteMovie(id);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }


    @RequestMapping(
            value = "*",
            method = { RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public String badRequest() {
        return "URl not found !!!";
    }

}
