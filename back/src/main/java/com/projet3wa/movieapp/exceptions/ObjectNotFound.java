package com.projet3wa.movieapp.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.NoSuchElementException;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class ObjectNotFound extends NoSuchElementException {
   public ObjectNotFound(String message){
       super(message);
   }

}
