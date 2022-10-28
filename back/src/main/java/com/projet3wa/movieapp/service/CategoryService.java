package com.projet3wa.movieapp.service;

import com.fasterxml.jackson.core.JsonParseException;
import com.projet3wa.movieapp.exceptions.ObjectExistsInDatabase;
import com.projet3wa.movieapp.exceptions.ObjectInvalidArgument;
import com.projet3wa.movieapp.model.Category;
import com.projet3wa.movieapp.other.CategoryName;
import com.projet3wa.movieapp.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;
    public CategoryName getEnumFromString(String categorie) throws ObjectInvalidArgument {
        CategoryName cat = null;
            switch(categorie){
                case "HORROR":
                    cat = cat.HORROR;
                    break;
                case "COMEDY":
                    cat = cat.COMEDY;
                    break;
                case "ACTION":
                    cat =  cat.ACTION;
                    break;
                case "DRAMA":
                    cat =  cat.DRAMA;
                    break;
                case "ADVENTURE":
                    cat =  cat.ADVENTURE;
                    break;
                case "HISTORICAL":
                    cat =  cat.HISTORICAL;
                    break;
                case "MUSICAL":
                    cat =  cat.MUSICAL;
                    break;
                case "FANTASTIC":
                    cat =  cat.FANTASTIC;
                    break;
            }
            if(cat == null){
                throw new ObjectInvalidArgument("Invalid Category");
            }else{
                return cat;
            }
    }

    public boolean checkIfExistingCategory(CategoryName category){
        Optional<Category> cat = categoryRepository.findByName(category);
        return cat.isPresent();
    }
    public Category saveCategory(Category category) throws ObjectExistsInDatabase, ObjectInvalidArgument {
        if(checkIfExistingCategory(category.getName())){
            throw new ObjectExistsInDatabase("Category exists in DB");
        }
        return categoryRepository.save(category);
    }

    public Set<Category> stringToSet(String[] nameCat) throws ObjectInvalidArgument {
        Set<Category> set= new HashSet<>(nameCat.length);
        for(String str : nameCat){
            CategoryName name = getEnumFromString(str);
            Category cat = new Category();
            cat.setName(name);
            set.add(cat);
        }
        return set;
    }


    public Set<Category> getCategoryDBFromSet(Set<Category> set) throws ObjectExistsInDatabase, ObjectInvalidArgument {
        Set<Category> newSet = new HashSet<>(set.size());
        for(Category cat : set){
            if(!checkIfExistingCategory(cat.getName())){
                Category newCat = saveCategory(cat);
                newSet.add(newCat);
            }else{
                newSet.add(categoryRepository.findByName(cat.getName()).get());
            }
        }
        return newSet;
    }

}
