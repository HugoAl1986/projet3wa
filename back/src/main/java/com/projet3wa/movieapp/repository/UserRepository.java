package com.projet3wa.movieapp.repository;

import com.projet3wa.movieapp.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User,Long> {
   User findByEmail(String email);
}
