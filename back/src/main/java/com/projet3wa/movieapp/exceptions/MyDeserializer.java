package com.projet3wa.movieapp.exceptions;


import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import com.fasterxml.jackson.databind.JsonNode;
import com.projet3wa.movieapp.model.Category;
import com.projet3wa.movieapp.other.CategoryName;
import com.projet3wa.movieapp.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jackson.JsonComponent;

import java.io.IOException;
@JsonComponent
public class MyDeserializer extends JsonDeserializer<Category> {

    @Autowired
    private CategoryService categoryService;

    @Override
    public Category deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException{
        JsonNode node = jsonParser.getCodec().readTree(jsonParser);
        String name = node.get("name").asText();
        CategoryName catName = categoryService.getEnumFromString(name);
        Category cat = new Category();
        cat.setName(catName);
        return cat;
    }
}
