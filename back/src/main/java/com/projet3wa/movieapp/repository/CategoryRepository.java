package com.projet3wa.movieapp.repository;

import com.projet3wa.movieapp.model.Category;
import com.projet3wa.movieapp.other.CategoryName;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface CategoryRepository extends CrudRepository<Category, Long> {
    @Override
    <S extends Category> S save(S entity);

    @Override
    Iterable<Category> findAll();

    Optional<Category> findByName(CategoryName name);

}
