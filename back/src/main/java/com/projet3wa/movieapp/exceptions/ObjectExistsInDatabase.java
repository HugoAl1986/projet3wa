package com.projet3wa.movieapp.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class ObjectExistsInDatabase extends Exception{
    public ObjectExistsInDatabase(String message){
        super(message);
    }

}
