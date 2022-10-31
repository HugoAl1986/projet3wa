package com.projet3wa.movieapp.service;

import com.projet3wa.movieapp.exceptions.InvalidCredentials;
import com.projet3wa.movieapp.exceptions.ObjectExistsInDatabase;
import com.projet3wa.movieapp.exceptions.ObjectNotFound;
import com.projet3wa.movieapp.model.User;
import com.projet3wa.movieapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    public User createUser(User user) {
        User newUser = new User();
        user.setEmail(user.getEmail());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole();
        return newUser;

    }

    public User saveUser(User user) throws ObjectExistsInDatabase {
        User newUser = createUser(user);
        if (userRepository.findByEmail(newUser.getEmail()) != null) {
            return userRepository.save(newUser);
        } else {
            throw new ObjectExistsInDatabase("Can not create, User exists in DB !!");
        }
    }

    public User FindEmailForLogin(String email){
        User userInDB = userRepository.findByEmail(email);
        if(userInDB == null){
            throw new ObjectNotFound("User does not Exists in DB");
        }else{
            return userInDB;
        }


    }

    public void authenticate(String email, String password){
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        }catch(AuthenticationException ex){
            throw new InvalidCredentials("bad credentials");
        }
    }
}
