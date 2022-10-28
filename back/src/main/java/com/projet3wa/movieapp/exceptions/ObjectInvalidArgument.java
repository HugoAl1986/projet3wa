package com.projet3wa.movieapp.exceptions;

import com.fasterxml.jackson.core.JsonLocation;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.IOException;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class ObjectInvalidArgument extends RuntimeException{

    public ObjectInvalidArgument(String message) {
        super(message);
    }
}
