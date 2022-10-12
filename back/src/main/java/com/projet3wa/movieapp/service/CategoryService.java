package com.projet3wa.movieapp.service;

import com.projet3wa.movieapp.model.Category;
import com.projet3wa.movieapp.other.CategoryName;
import com.projet3wa.movieapp.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;
    public CategoryName getEnumFromString(String categorie){
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
        }
        if(cat == null){
            throw new IllegalArgumentException();
        };
        return cat;
    }

    public boolean checkIfExistingCategory(CategoryName category){
        Optional<Category> cat = categoryRepository.findByName(category);
        return cat.isPresent();
    }
    public Category saveCategory(Category category){
        return categoryRepository.save(category);
    }

    public Set<Category> stringToSet(String[] nameCat){
        Set<Category> set= new HashSet<>(nameCat.length);
        for(String str : nameCat){
            CategoryName name = getEnumFromString(str);
            Category cat = new Category();
            cat.setName(name);
            set.add(cat);
        }
        return set;
    }


    public Set<Category> getCategoryDBFromSet(Set<Category> set){
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
