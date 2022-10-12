package com.projet3wa.movieapp.repository;

import com.projet3wa.movieapp.model.Movie;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MovieRepository extends CrudRepository<Movie,Long> {
    @Override
    <S extends Movie> S save(S entity);
    Optional<Movie> findByName(String name);

    @Override
    Optional<Movie> findById(Long aLong);


}
