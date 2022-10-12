package com.projet3wa.movieapp.service;

import com.projet3wa.movieapp.model.User;
import com.projet3wa.movieapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    public User saveUser(User user){
        if(userRepository.findByEmail(user.getEmail()) != null){
            throw new RuntimeException("Can not create, this user exists in DB !!");
        }
            User newUser = new User();
            newUser.setEmail(user.getEmail());
            newUser.setRole();
            newUser.setPassword(passwordEncoder.encode(user.getPassword()));
            return userRepository.save(newUser);
    }
}
