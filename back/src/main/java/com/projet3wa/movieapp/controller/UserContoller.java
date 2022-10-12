package com.projet3wa.movieapp.controller;

import com.projet3wa.movieapp.model.User;

import com.projet3wa.movieapp.security.ApplicationUserDetailService;
import com.projet3wa.movieapp.security.JwtRequest;
import com.projet3wa.movieapp.security.JwtResponse;
import com.projet3wa.movieapp.security.JwtUtil;
import com.projet3wa.movieapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/movies/users")
public class UserContoller {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private ApplicationUserDetailService applicationUserDetailService;


    @PostMapping(value = "/createuser")
    public ResponseEntity<?> createUser(@RequestBody User user){
        user.setRole();
        User newUser;
        System.out.println("-----------role = " + user.getRole());
        try{
            newUser = userService.saveUser(user);
        }catch(RuntimeException ex){
            return new ResponseEntity<>("Utilisateur non crée", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PostMapping(value = "/login")
    public ResponseEntity<?> authenticate(@RequestBody JwtRequest request) throws Exception {
        System.out.println("1");
        authenticate(request.getEmail(), request.getPassword());
        System.out.println("2");
        final UserDetails userDetails = applicationUserDetailService.loadUserByUsername(request.getEmail());

        final String token = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(token));
    }

    private void authenticate(String email, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }

}
