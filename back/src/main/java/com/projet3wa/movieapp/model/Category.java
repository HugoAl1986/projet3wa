package com.projet3wa.movieapp.model;

import com.fasterxml.jackson.annotation.JsonEnumDefaultValue;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.projet3wa.movieapp.exceptions.MyDeserializer;
import com.projet3wa.movieapp.other.CategoryName;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;


@Getter
@Setter
@Entity
@Table(name="category")
@NoArgsConstructor
@JsonDeserialize(using = MyDeserializer.class)
public class Category {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name="name", nullable = false, unique = true)
    private CategoryName name;

    @JsonIgnore
    @ManyToMany(mappedBy = "categories")
    Set<Movie> movies;

}
