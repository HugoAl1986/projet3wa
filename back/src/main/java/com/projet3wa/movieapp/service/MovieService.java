package com.projet3wa.movieapp.service;

import com.projet3wa.movieapp.model.Category;
import com.projet3wa.movieapp.model.Movie;
import com.projet3wa.movieapp.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.Set;


@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired CategoryService categoryService;


    public Movie saveMovie(Movie movie){
        return movieRepository.save(movie);
    }

    public boolean checkExistingMovie(Movie movie){
        Optional<Movie> foundMovie = movieRepository.findByName(movie.getName());
        return foundMovie.isPresent();
    }

    public List<Movie> getMovies(){
        return (List<Movie>) movieRepository.findAll();
    }

    public Movie putMovie(Movie movie, long id, Set<Category> set){

       Movie existingMovie = movieRepository.findById(id).get();
       existingMovie.setName(movie.getName());
       existingMovie.setYear(movie.getYear());
       existingMovie.setDuration(movie.getDuration());
       existingMovie.setIsAdult(movie.getIsAdult());
       existingMovie.setCategories(set);
       return saveMovie(existingMovie);

    }

    public void deleteMovie(long id){
        Movie movie = movieRepository.findById(id).orElseThrow();
        movieRepository.deleteById(id);
    }

    public Movie findMovieById(long id){
        return movieRepository.findById(id).orElseThrow();
    }

    public Movie findMovieByName(String nameMovie){
        return  movieRepository.findByName(nameMovie).orElseThrow();
    }
}
