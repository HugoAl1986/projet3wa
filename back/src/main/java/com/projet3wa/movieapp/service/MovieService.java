package com.projet3wa.movieapp.service;

import com.projet3wa.movieapp.exceptions.ObjectExistsInDatabase;
import com.projet3wa.movieapp.exceptions.ObjectNotFound;
import com.projet3wa.movieapp.model.Category;
import com.projet3wa.movieapp.model.Movie;
import com.projet3wa.movieapp.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Set;


@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired CategoryService categoryService;


    public Movie saveMovie(Movie movie) throws ObjectExistsInDatabase {
       if(checkExistingMovie(movie)){
            throw new ObjectExistsInDatabase("Movie exists in DB");
        }else{
           return movieRepository.save(movie);
       }

    }

    public Movie saveMovieLinked(Movie movie){
        return movieRepository.save(movie);
    }

    public boolean checkExistingMovie(Movie movie){
        Optional<Movie> foundMovie = movieRepository.findByName(movie.getName());
        return foundMovie.isPresent();
    }

    public List<Movie> getMovies(){
        return (List<Movie>) movieRepository.findAll();
    }

    public Movie putMovie(Movie movie, long id, Set<Category> set) throws ObjectExistsInDatabase {

       Movie existingMovie = findMovieById(id);
       existingMovie.setName(movie.getName());
       existingMovie.setYear(movie.getYear());
       existingMovie.setDuration(movie.getDuration());
       existingMovie.setIsAdult(movie.getIsAdult());
       existingMovie.setCategories(set);
       return saveMovieLinked(existingMovie);

    }

    public void deleteMovie(long id){
        Movie movie = findMovieById(id);
        movieRepository.delete(movie);
    }

    public Movie findMovieById(long id){
        try{
            return movieRepository.findById(id).get();
        }catch(NoSuchElementException ex){
            throw new ObjectNotFound("Movie Doesn't exists in DB !!");
        }
    }

    public Movie findMovieByName(String nameMovie){
        try{
            return movieRepository.findByName(nameMovie).get();
        }catch(NoSuchElementException ex){
            throw new ObjectNotFound("Movie doesn't exists in DB !!");
        }
    }
}
