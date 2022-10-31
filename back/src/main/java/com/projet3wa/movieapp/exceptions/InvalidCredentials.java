package com.projet3wa.movieapp.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class InvalidCredentials extends AuthenticationException {
    public InvalidCredentials(String message){
        super(message);
    }
}
