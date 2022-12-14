package com.projet3wa.movieapp.controller;

import com.projet3wa.movieapp.exceptions.ObjectExistsInDatabase;
import com.projet3wa.movieapp.model.User;

import com.projet3wa.movieapp.repository.UserRepository;
import com.projet3wa.movieapp.security.ApplicationUserDetailService;
import com.projet3wa.movieapp.security.JwtRequest;
import com.projet3wa.movieapp.security.JwtResponse;
import com.projet3wa.movieapp.security.JwtUtil;
import com.projet3wa.movieapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.NonTransientDataAccessException;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/movies/users")
@CrossOrigin
public class UserContoller {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;



    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private ApplicationUserDetailService applicationUserDetailService;


    @PostMapping(value = "/createuser")
    public ResponseEntity<?> createUser(@RequestBody User user) throws ObjectExistsInDatabase {
        User newUser = userService.saveUser(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PostMapping(value = "/login")
    public ResponseEntity<?> authenticate(@RequestBody JwtRequest request){

            User user = userService.FindEmailForLogin(request.getEmail());
            userService.authenticate(request.getEmail(), request.getPassword());
            final UserDetails userDetails = applicationUserDetailService.loadUserByUsername(request.getEmail());
            final String token = jwtUtil.generateToken(userDetails, user.getRole());
            return ResponseEntity.ok(new JwtResponse(token));

    }



}
