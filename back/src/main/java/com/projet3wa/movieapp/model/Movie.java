package com.projet3wa.movieapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Table(name="movie")
@Entity
@Setter
@Getter
@NoArgsConstructor
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name="name", nullable = false, unique = true)
    private String name;

    @Column(name="duration", nullable = false)
    private int duration;

    @Column(name="isAdult", nullable = false)
    String isAdult;

    @Column(name="year", nullable = false)
    private int year;



    @ManyToMany
    @JoinTable(
            name = "movie_category",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id"))
    Set<Category> categories;

}
